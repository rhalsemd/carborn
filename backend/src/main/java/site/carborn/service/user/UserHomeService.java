package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.company.RepairShopRepository;
import site.carborn.repository.user.CarSaleRepository;

@Service
public class UserHomeService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private RepairShopRepository repairShopRepository;

    @Autowired
    private InspectorRepository inspectorRepository;

    @Autowired
    private CarSaleRepository carSaleRepository;

    public Long getCarCount(){
        return carRepository.countBy();
    }

    public Long getRepairCount(){
        return repairShopRepository.countBy();
    }

    public Long getInspectorCount(){
        return inspectorRepository.countBy();
    }

    public Long getCarSaleCount(){
        return carSaleRepository.countBy();
    }
}
