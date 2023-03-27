package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.repository.car.CarRepository;

@Service
public class UserHomeService {

    @Autowired
    private CarRepository carRepository;

    public Long getCarCount(){
        return carRepository.countBy();
    }
}
