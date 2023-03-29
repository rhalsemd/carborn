package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.CarSaleBook;
import site.carborn.mapping.user.CarSaleBookGetListMapping;

@Repository
public interface CarSaleBookRepository extends JpaRepository<CarSaleBook, Integer> {
    Page<CarSaleBookGetListMapping> findAllByStatusAndAccountId(@Param("status") boolean status, @Param("accountId") String accountId, Pageable page);
}
