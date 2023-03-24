package site.carborn.service.company;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.entity.user.RepairBook;
import site.carborn.entity.user.RepairResult;
import site.carborn.mapping.user.*;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.RepairShopRepository;
import site.carborn.repository.company.RepairShopReviewRepository;
import site.carborn.repository.user.RepairBookRepository;
import site.carborn.repository.user.RepairResultRepository;
import site.carborn.service.common.KlaytnService;
import site.carborn.util.common.BookUtils;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RepairShopService {

    @Autowired
    private RepairShopRepository repairShopRepository;

    @Autowired
    private RepairBookRepository repairBookRepository;

    @Autowired
    private RepairResultRepository repairResultRepository;

    @Autowired
    private RepairShopReviewRepository repairShopReviewRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private KlaytnService klaytnService;

    @Transactional
    public Page<RepairBookGetListMapping> repairBookList(Pageable page){
        //현재는 임시 아이디(아이디 받아오는 부분 필요)
        String repairShop = "againsburgh28";

        int repairShopId = repairShopRepository.findByAccount_Id(repairShop).getId();
        return repairBookRepository.findByStatusAndRepairShop_Id(false,repairShopId,page);
    }

    @Transactional
    public RepairBookGetDetailMapping repairBookDetailContent(int id){
        return repairBookRepository.findAllById(id);
    }

    @Transactional
    public Optional<RepairBook> repairBookUpdateData(int id){
        return repairBookRepository.findById(id);
    }

    @Transactional
    public void repairBookUpdate(RepairBook repairBook){
        repairBook.setBookStatus(BookUtils.BOOK_STATUS_COMPLETE);
        repairBook.setUptDt(LocalDateTime.now());
        repairBookRepository.save(repairBook);
    }

    @Transactional
    public void repairResultInsert(RepairResult repairResult, int repairBookId) throws IOException {
        repairResult.setRepairBook(new RepairBook());
        repairResult.getRepairBook().setId(repairBookId);
        repairResult.setRegDt(LocalDateTime.now());

        //bookId를 통해 carHash를 가져오는 부분
        String carVin = repairBookRepository.findAllById(repairBookId).getCarVin();
        int carId = carRepository.findByVin(carVin).getId();

        //carId를 통해 carHash를 가져오는 부분
        String carHash = carRepository.findAllById(carId).getWalletHash();

        //multipartfile 입력 부분


        //caver 입력 부분
        //kas api 호출
        //metaData 등록
        String metaDataUri = klaytnService.getUri(repairResult).get("uri").toString();

        //데이터 저장 및 alias 규칙에 따라 alias 생성
        LocalDateTime aliastime = repairResult.getRegDt();
        String alias = "repair-"+carHash+"-time-"+aliastime.format(DateTimeFormatter.ISO_LOCAL_DATE)+aliastime.getHour()+aliastime.getMinute()+aliastime.getSecond();

        //contract 배포
        klaytnService.requestContract(metaDataUri, carHash, alias);
        repairResult.setContractHash(alias);

        repairResultRepository.save(repairResult);
    }

    @Transactional
    public Page<RepairResultGetListMapping> repairResultGetList(Pageable page){
        //현재는 임시 아이디(아이디 받아오는 부분 필요)
        String repairShop = "againsburgh28";
        int repairShopId = repairShopRepository.findByAccount_Id(repairShop).getId();

        return repairResultRepository.findByRepairBook_RepairShop_Id(repairShopId, page);
    }
    @Transactional
    public RepairShopReviewGetDetailMapping repairResultDetailContent(int id){
        return repairShopReviewRepository.findByStatusAndRepairResult_Id(false, id);
    }
}
