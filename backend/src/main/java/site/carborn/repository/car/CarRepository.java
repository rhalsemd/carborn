package site.carborn.repository.car;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.Car;
import site.carborn.mapping.car.CarGetDetailMapping;
import site.carborn.mapping.car.CarGetIdMapping;
import site.carborn.mapping.car.CarGetListMapping;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    CarGetIdMapping findByVin(String vin);

    CarGetDetailMapping findAllByStatusAndId(@Param("status") boolean status, @Param("id") int Id);

    Long countBy();

    Page<CarGetListMapping> findAllByAccount_Id(@Param("AccountId") String AccountId, Pageable page);
}
