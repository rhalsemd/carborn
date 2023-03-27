package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.company.RepairShopRepository;

@Service
public class UserHomeService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private RepairShopRepository repairShopRepository;

    @Autowired
    private InspectorRepository inspectorRepository;

    public Long getCarCount(){
        return carRepository.countBy();
    }

    public Long getRepairCount(){
        return repairShopRepository.countBy();
    }

    public Long getInspectorCount(){
        return inspectorRepository.countBy();
    }
}
