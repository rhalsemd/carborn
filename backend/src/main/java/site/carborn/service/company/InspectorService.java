package site.carborn.service.company;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.dto.request.InspectResultRequestDTO;
import site.carborn.entity.user.InspectBook;
import site.carborn.entity.user.InspectResult;
import site.carborn.mapping.company.InspectorReviewMapping;
import site.carborn.mapping.user.InspectBookGetDetailMapping;
import site.carborn.mapping.user.InspectBookGetListMapping;
import site.carborn.mapping.user.InspectResultGetDetailMapping;
import site.carborn.mapping.user.InspectResultGetListMapping;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.company.InspectorReviewRepository;
import site.carborn.repository.user.InspectBookRepository;
import site.carborn.repository.user.InspectResultRepository;
import site.carborn.service.common.KlaytnService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.BookUtils;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InspectorService {

    @Autowired
    private InspectorRepository inspectorRepository;

    @Autowired
    private InspectBookRepository inspectBookRepository;

    @Autowired
    private InspectResultRepository inspectResultRepository;

    @Autowired
    private InspectorReviewRepository inspectorReviewRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private KlaytnService klaytnService;

    @Transactional
    public Page<InspectBookGetListMapping> inspectBookGetList(Pageable page){
        //회사 ID 가져오는 부분(현재는 임시)
        String inspector = "imunseymc";
        int inspectorId = inspectorRepository.findByAccount_Id(inspector).getId();

        return inspectBookRepository.findByStatusAndInspector_Id(false,inspectorId,page);
    }

    @Transactional
    public InspectBookGetDetailMapping inspectBookDetail(int id){
        return inspectBookRepository.findAllById(id);
    }

    @Transactional
    public Optional<InspectBook> inspectBookUpdateData(int id){
        return inspectBookRepository.findById(id);
    }

    @Transactional
    public void inspectorBookUpdate(InspectBook inspectBook){
        inspectBook.setBookStatus(BookUtils.BOOK_STATUS_COMPLETE);
        inspectBook.setUptDt(LocalDateTime.now());
        inspectBookRepository.save(inspectBook);
    }

    @Transactional
    public void inspectorResultInsert(InspectResultRequestDTO dto) throws IOException {
        //검수 결과 입력
        dto.setRegDt(LocalDateTime.now());

        //bookId를 통해 carHash를 가져오는 부분
        String carVin = inspectBookRepository.findAllById(dto.getInspectBook().getId()).getCarVin();
        int carId = carRepository.findByVin(carVin).getId();

        //carId를 통해 carHash를 가져오는 부분
        String carHash = carRepository.findAllById(carId).getWalletHash();

        //multipartfile 입력 부분
        String beforeImgNm = BoardUtils.singleFileSave((dto.getBeforeImg()));
        String afterImgNm = BoardUtils.singleFileSave((dto.getAfterImg()));
        String receiptImgNm = BoardUtils.singleFileSave((dto.getReceiptImg()));

        dto.setBeforeImgNm(beforeImgNm);
        dto.setAfterImgNm(afterImgNm);
        dto.setReceiptImgNm(receiptImgNm);

        InspectResult inspectResult = InspectResult.copy(dto);

        //caver 입력 부분
        //kas api 호출
        //metaData 등록
        String metaDataUri = klaytnService.getUri(inspectResult).get("uri").toString();

        //데이터 저장 및 alias 규칙에 따라 alias 생성
        LocalDateTime aliastime = inspectResult.getRegDt();
        String alias = "inspect-time-"+aliastime.format(DateTimeFormatter.ISO_LOCAL_DATE)+aliastime.getHour()+aliastime.getMinute()+aliastime.getSecond();

        //contract 배포
        klaytnService.requestContract(metaDataUri, carHash, alias);
        inspectResult.setContractHash(alias);

        inspectResultRepository.save(inspectResult);
    }

    @Transactional
    public Page<InspectResultGetListMapping> inspectResultGetList(Pageable page){
        //회사 ID 가져오는 부분(현재는 임시)
        String inspector = "imunseymc";
        int inspectorId = inspectorRepository.findByAccount_Id(inspector).getId();

        return inspectResultRepository.findByInspectBook_Inspector_Id(inspectorId,page);
    }

    @Transactional
    public InspectResultGetDetailMapping inspectResultDetail(int id){
        return inspectResultRepository.findAllById(id);
    }

    @Transactional
    public InspectorReviewMapping inspectResultReview(int id){
        return inspectorReviewRepository.findByStatusAndInspectResult_Id(false, id);
    }
}
