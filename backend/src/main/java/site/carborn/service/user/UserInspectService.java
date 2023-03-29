package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.dto.request.UserInspectRequestDTO;
import site.carborn.dto.request.UserInspectReviewRequestDTO;
import site.carborn.entity.account.Account;
import site.carborn.entity.car.Car;
import site.carborn.entity.company.Inspector;
import site.carborn.entity.company.InspectorReview;
import site.carborn.entity.user.InspectBook;
import site.carborn.entity.user.InspectResult;
import site.carborn.mapping.company.InspectorReviewMapping;
import site.carborn.mapping.user.*;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.company.InspectorReviewRepository;
import site.carborn.repository.user.InspectBookRepository;
import site.carborn.repository.user.InspectResultRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.BookUtils;

import java.time.LocalDateTime;

@Service
public class UserInspectService {
    @Autowired
    private InspectBookRepository inspectBookRepository;
    @Autowired
    private InspectResultRepository inspectResultRepository;

    @Autowired
    private InspectorReviewRepository inspectorReviewRepository;

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private InspectorRepository inspectorRepository;
    @Autowired
    private CarRepository carRepository;

    public Page<UserInspectBookListMapping> inspectBookList(String accountId, int page, int size){
        Page<UserInspectBookListMapping> inspectBookList = inspectBookRepository.findByStatusAndAccount_Id(
                BoardUtils.BOARD_DELETE_STATUS_FALSE,
                accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );
        if(inspectBookList.isEmpty()){
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return inspectBookList;
    }


    public UserInspectBookDetailMapping inspectBookDetail(Integer id){
        UserInspectBookDetailMapping inspectBook = inspectBookRepository.findAllByIdAndStatus(id,BoardUtils.BOARD_DELETE_STATUS_FALSE);

        if (inspectBook == null){
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }

        return inspectBook;
    }


    public int createInspectBook(UserInspectRequestDTO dto){

        if (dto.getAccountId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }
        Account account = accountRepository.findById(dto.getAccountId());
        if (account == null){
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }

        Inspector inspector = inspectorRepository.findById(dto.getInspectorId()).orElseThrow(()->
                new RuntimeException("존재하지 않는 검수원입니다"));

        Car car = carRepository.findById(dto.getCarId()).orElseThrow(()->
                new RuntimeException("등록되지 않은 차입니다"));

//        dto.setRegDt(LocalDateTime.now());
//        dto.setUptDt(LocalDateTime.now());
//        dto.setBookStatus(BookUtils.BOOK_STATUS_WAIT);
//        dto.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);
        InspectBook inspectBook = InspectBook.builder()
                .car(car)
                .inspector(inspector)
                .account(account)
                .content(dto.getContent())
                .bookStatus(BookUtils.BOOK_STATUS_WAIT)
                .bookDt(dto.getBookDt())
                .regDt(LocalDateTime.now())
                .uptDt(LocalDateTime.now())
                .status(BoardUtils.BOARD_DELETE_STATUS_FALSE)
                .build();

        InspectBook save = inspectBookRepository.save(inspectBook);
        return save.getId();
    }

    public void deleteInspectBook(Integer id){
        InspectBook delete = inspectBookRepository.findById(id).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다")
        );

        if (delete.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE) {
            throw new RuntimeException("삭제된 데이터입니다");
        }

        delete.setStatus(BoardUtils.BOARD_DELETE_STATUS_TRUE);
        delete.setUptDt(LocalDateTime.now());
        inspectBookRepository.save(delete);
    }


    public int updateInspectBook(UserInspectRequestDTO dto, int inspectBookId) {

        if (dto.getAccountId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }

        if (accountRepository.findById(dto.getAccountId())==null){
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }
        if (dto.getId() != inspectBookId){
            throw new RuntimeException("잘못된 경로입니다");
        }
        InspectBook update = inspectBookRepository.findById(inspectBookId).orElseThrow(()->
                new RuntimeException("존재하지 않는 데이터입니다"));

        if (!dto.getAccountId().equals(update.getAccount().getId())){
            throw new RuntimeException("권한이 없습니다");
        }

        update.setContent(dto.getContent());
        update.setBookDt(dto.getBookDt());
        update.setUptDt(LocalDateTime.now());

        inspectBookRepository.save(update);
        return update.getId();
    }

    //검수완료
    public Page<UserInspectResultListMapping> inspectResultList(String accountId, int page, int size) {
        Page<UserInspectResultListMapping> inspectResultList = inspectResultRepository.findByInspectBook_StatusAndInspectBook_Account_Id(
                BoardUtils.BOARD_DELETE_STATUS_FALSE,
                accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"inspectDt", BoardUtils.ORDER_BY_DESC
                )
        );
        if(inspectResultList.isEmpty()){
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return inspectResultList;
    }

    public InspectResultGetDetailMapping inspectResultDetail(int inspectBookId){
        int bookStatus = inspectBookRepository.findById(inspectBookId).get().getBookStatus();
        if (bookStatus == 0){
            throw new RuntimeException("검사가 완료되지 않았습니다");
        } else if (bookStatus == 2) {
            throw new RuntimeException("취소된 예약입니다");
        }
        InspectResultGetDetailMapping result = inspectResultRepository.findAllByInspectBookId(inspectBookId);
        if (result == null){
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }
        return result;
    }

    public InspectorReviewMapping getInspectReviewDetail(int inspectResultId){
        InspectorReviewMapping result = inspectorReviewRepository.findByStatusAndInspectResult_Id(BoardUtils.BOARD_DELETE_STATUS_FALSE, inspectResultId);
        return result;
    }

    public int createInspectReview(int inspectResultId, UserInspectReviewRequestDTO dto){
        InspectResult result = inspectResultRepository.findById(inspectResultId).orElseThrow(()->
                new RuntimeException("수리결과가 없습니다"));

        if (dto.getAccountId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }
        Account account = accountRepository.findById(dto.getAccountId());
        if (account == null){
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }
        if (!account.getId().equals(dto.getAccountId())){
            throw new RuntimeException("권한이 없습니다");
        }

        InspectorReview inspectorReview = InspectorReview.builder()
                .inspectResult(result)
                .inspector(result.getInspectBook().getInspector())
                .account(account)
                .content(dto.getContent())
                .point(dto.getPoint())
                .regDt(LocalDateTime.now())
                .uptDt(LocalDateTime.now())
                .status(BoardUtils.BOARD_DELETE_STATUS_FALSE)
                .build();

//        UserInspectReviewRequestDTO.setInspectResult(result);
//        UserInspectReviewRequestDTO.setInspector(result.getInspectBook().getInspector());
//        UserInspectReviewRequestDTO.setAccount(result.getInspectBook().getAccount());
//
//        UserInspectReviewRequestDTO.setRegDt(LocalDateTime.now());
//        UserInspectReviewRequestDTO.setUptDt(LocalDateTime.now());
//        UserInspectReviewRequestDTO.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);

        InspectorReview save = inspectorReviewRepository.save(inspectorReview);
        return save.getId();
    }
}
