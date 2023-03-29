package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.CarSale;
import site.carborn.mapping.user.CarSaleGetListMapping;

@Repository
public interface CarSaleRepository extends JpaRepository<CarSale, Integer> {
    Long countByStatusAndSaleStatus(@Param("status") boolean status,@Param("saleStatus") int saleStatus);

    Page<CarSaleGetListMapping> findAllByStatusAndSaleStatus(@Param("status") boolean status, @Param("saleStatus") int saleStatus, Pageable page);

    Page<CarSaleGetListMapping> findAllByStatusAndAccountId(@Param("status") boolean status, @Param("accountId") String accountId, Pageable page);
}
