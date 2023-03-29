package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.CarSale;
import site.carborn.mapping.user.CarSaleGetListMapping;

import java.time.LocalDateTime;

@Repository
public interface CarSaleRepository extends JpaRepository<CarSale, Integer> {
    Long countByStatusAndSaleStatus(@Param("status") boolean status,@Param("saleStatus") int saleStatus);

    Page<CarSaleGetListMapping> findAllByStatusAndSaleStatus(@Param("status") boolean status, @Param("saleStatus") int saleStatus, Pageable page);

    Page<CarSaleGetListMapping> findAllByStatusAndAccountId(@Param("status") boolean status, @Param("accountId") String accountId, Pageable page);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE CarSale cs SET cs.saleStatus = :saleStatus, cs.uptDt = :uptDt WHERE cs.id = :id AND cs.status = :status")
    void updateSaleCancel(@Param("id") int id,@Param("status") boolean status, @Param("saleStatus") int saleStatus, @Param("uptDt") LocalDateTime uptDt);
}
