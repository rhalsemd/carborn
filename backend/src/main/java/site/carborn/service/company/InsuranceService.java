package site.carborn.service.company;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.entity.car.Car;
import site.carborn.entity.car.CarInsuranceHistory;
import site.carborn.entity.company.InsuranceCompany;
import site.carborn.mapping.car.CarInsuranceHistoryGetDetailMapping;
import site.carborn.mapping.car.CarInsuranceHistoryGetListMapping;
import site.carborn.repository.car.CarInsuranceHistoryRepository;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.InsuranceCompanyRepository;
import site.carborn.service.common.KlaytnService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Service
@RequiredArgsConstructor
public class InsuranceService {

    @Autowired
    private CarInsuranceHistoryRepository carInsuranceHistoryRepository;

    @Autowired
    private InsuranceCompanyRepository insuranceCompanyRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private KlaytnService klaytnService;

    @Transactional
    public void insertCarInsuranceHistory(CarInsuranceHistory carInsuranceHistory) throws IOException {

        carInsuranceHistory.setRegDt(LocalDateTime.now());
        //multipartfile 들어가야 되는 부분

        //회사 ID 가져오는 부분(현재는 임시)
        String id = "insurancetest";
        
        //회사 아이디 및 carVin을 통해 insuranceId와 carId를 가져오는 부분
        int insuranceId = insuranceCompanyRepository.findByAccount_Id(id).getId();
        int carId = carRepository.findByVin(carInsuranceHistory.getCarVin()).getId();
        carInsuranceHistory.setCar(new Car());
        carInsuranceHistory.getCar().setId(carId);
        carInsuranceHistory.setInsuranceCompany(new InsuranceCompany());
        carInsuranceHistory.getInsuranceCompany().setId(insuranceId);

        //carId를 통해 carHash를 가져오는 부분
        String carHash = carRepository.findAllById(carId).getWalletHash();

        //kas api 호출
        //metaData 등록
        String metaDataUri = klaytnService.getUri(carInsuranceHistory).get("uri").toString();

        //데이터 저장 및 alias 규칙에 따라 alias 생성
        LocalDateTime aliastime = carInsuranceHistory.getRegDt();
        String alias = "insurance-"+carId+"time-"+aliastime.format(DateTimeFormatter.ISO_LOCAL_DATE)+aliastime.getHour()+aliastime.getMinute()+aliastime.getSecond();

        //contract 배포
        carInsuranceHistory.setContractHash(klaytnService.getContractHash(metaDataUri, carHash, alias).get("transactionHash").toString());

        carInsuranceHistoryRepository.save(carInsuranceHistory);
    }

    @Transactional
    public Page<CarInsuranceHistoryGetListMapping> carinsuranceHistoryList(Pageable page){
        //회사 ID 가져오는 부분(현재는 임시)
        String id = "insurancetest";
        int insuranceId = insuranceCompanyRepository.findByAccount_Id(id).getId();

        return carInsuranceHistoryRepository.findAllByInsuranceCompany_Id(insuranceId,page);
    }
    @Transactional
    public CarInsuranceHistoryGetDetailMapping carinsuranceHistoryDetail(int id){
        return carInsuranceHistoryRepository.findAllById(id);
    }
}
