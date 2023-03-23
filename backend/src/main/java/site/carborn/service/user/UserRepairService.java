package site.carborn.service.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.entity.account.Account;
import site.carborn.entity.user.RepairBook;
import site.carborn.mapping.user.UserRepairBookListMapping;
import site.carborn.mapping.user.UserRepairResultListMapping;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.user.RepairBookRepository;
import site.carborn.repository.user.RepairResultRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.BookUtils;

import java.time.LocalDateTime;


@Service
@Transactional
public class UserRepairService {
    @Autowired
    private RepairBookRepository repairBookRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    private RepairResultRepository repairResultRepository;

    public Page<UserRepairBookListMapping> repairBookList(String accountId, int page) {
        Page<UserRepairBookListMapping> repairBooks = repairBookRepository.findByStatusAndAccount_Id(
                BoardUtils.BOARD_DELETE_STATUS_FALSE,
                accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,BoardUtils.PAGE_PER_ROW_20
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );
        if(repairBooks.isEmpty()){
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return repairBooks;
    }

    public UserRepairBookListMapping repairBook(Integer id){
        //게시글이 없을때
        RepairBook repairBook = repairBookRepository.findById(id).orElseThrow(()->
                new RuntimeException("존재하지 않는 데이터입니다"));

        if (repairBook.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE){
            throw new RuntimeException("삭제된 데이터입니다.");
        }

        return repairBookRepository.findByStatusAndId(BoardUtils.BOARD_DELETE_STATUS_FALSE, id);
    }


    public int createRepairBook(RepairBook repairBook){

        if (repairBook.getAccount().getId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }
        Account account = accountRepository.findById(repairBook.getAccount().getId());
        if (account == null){
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }

        repairBook.setRegDt(LocalDateTime.now());
        repairBook.setUptDt(LocalDateTime.now());
        repairBook.setBookStatus(BookUtils.BOOK_STATUS_WAIT);
        repairBook.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);

        RepairBook save = repairBookRepository.save(repairBook);
        return save.getId();
    }

    public void deleteRepairBook(Integer id){
        RepairBook delete = repairBookRepository.findById(id).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다")
        );

        if (delete.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE) {
            throw new RuntimeException("삭제된 데이터입니다");
        }

        delete.setStatus(BoardUtils.BOARD_DELETE_STATUS_TRUE);
        delete.setUptDt(LocalDateTime.now());
        repairBookRepository.save(delete);
    }

    public int updateRepairBook(RepairBook repairBook) {

        if (repairBook.getAccount().getId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }

        if (accountRepository.findById(repairBook.getAccount().getId())==null){
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }

        RepairBook update = repairBookRepository.findById(repairBook.getId()).orElseThrow(()->
                new RuntimeException("존재하지 않는 데이터입니다"));
        update.setCar(repairBook.getCar());
        update.setContent(repairBook.getContent());
        update.setBookDt(repairBook.getBookDt());
        update.setUptDt(LocalDateTime.now());

        repairBookRepository.save(update);
        return update.getId();
    }

    public Page<UserRepairResultListMapping> repairResultList(String accountId, int page) {
        Page<UserRepairResultListMapping> repairResults = repairResultRepository.findByRepairBook_StatusAndRepairBook_Account_Id(
                BoardUtils.BOARD_DELETE_STATUS_FALSE,
                accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,BoardUtils.PAGE_PER_ROW_20
                        ,"repairDt", BoardUtils.ORDER_BY_DESC
                )
        );
        if(repairResults.isEmpty()){
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return repairResults;
    }
}
