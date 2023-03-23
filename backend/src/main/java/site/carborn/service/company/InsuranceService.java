package site.carborn.service.company;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.dto.request.CarInsuranceHistoryRequestDTO;
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
    public void insertCarInsuranceHistory(CarInsuranceHistoryRequestDTO carInsuranceHistoryRequestDTO) throws IOException {
        CarInsuranceHistory carInsuranceHistory = CarInsuranceHistory.copy(carInsuranceHistoryRequestDTO);

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

        //alias 규칙에 따라 alias 생성
        String alias = "insurance"+carId+carInsuranceHistory.getRegDt();

        //caver 입력 부분
        //String metaDataUri = carInsuranceHistoryRequestDTO.getMetaDataUri();
        String metaDataUri = klaytnService.getUri(carInsuranceHistory).get("uri").toString();
        //carInsuranceHistory.setContractHash(klaytnService.getContractHash(metaDataUri, carHash, alias).get("transactionHash").toString());

        //데이터 저장
        //carInsuranceHistoryRepository.save(carInsuranceHistory);
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
