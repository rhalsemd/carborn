package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.CarSale;

@Repository
public interface CarSaleRepository extends JpaRepository<CarSale, Integer> {
    Long countBySaleStatus(@Param("saleStatus") int saleStatus);
}
