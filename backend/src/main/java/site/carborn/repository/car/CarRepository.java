package site.carborn.repository.car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.Car;
import site.carborn.mapping.car.CarGetHashMapping;
import site.carborn.mapping.car.CarGetIdMapping;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    CarGetIdMapping findByVin(String vin);

    CarGetHashMapping findAllById(int Id);

    Long countBy();
}
