package site.carborn.service.company;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.entity.car.CarInsuranceHistory;
import site.carborn.repository.car.CarInsuranceHistoryRepository;
import site.carborn.repository.company.InsuranceCompanyRepository;

@Service
@RequiredArgsConstructor
public class InsuranceService {

    @Autowired
    private CarInsuranceHistoryRepository carInsuranceHistoryRepository;

    @Autowired
    private InsuranceCompanyRepository insuranceCompanyRepository;

    @Transactional
    public void insertCarInsuranceHistory(CarInsuranceHistory carInsuranceHistory){
        //회사 ID 가져오는 부분(현재는 임시)
        String id = "insurancetest";
        int carId = insuranceCompanyRepository.findByAccount_Id(id).getId();
        carInsuranceHistory.getCar().setId(carId);
        carInsuranceHistoryRepository.save(carInsuranceHistory);
    }
}
