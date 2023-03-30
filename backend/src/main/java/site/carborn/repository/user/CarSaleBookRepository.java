package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.CarSaleBook;
import site.carborn.mapping.user.CarSaleBookGetDetailMapping;
import site.carborn.mapping.user.CarSaleBookGetListMapping;

import java.time.LocalDateTime;

@Repository
public interface CarSaleBookRepository extends JpaRepository<CarSaleBook, Integer> {
    Page<CarSaleBookGetListMapping> findAllByStatusAndAccountId(@Param("status") boolean status, @Param("accountId") String accountId, Pageable page);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE CarSaleBook csb SET csb.bookStatus = :bookStatus, csb.uptDt = :uptDt WHERE csb.id = :id AND csb.status = :status")
    void updateBookStatusCancel(@Param("id") int id,@Param("bookStatus") int bookStatus, @Param("status") boolean status ,@Param("uptDt") LocalDateTime uptDt);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE CarSaleBook csb SET csb.bookStatus = :bookStatus, csb.uptDt = :uptDt WHERE csb.carSale.id = :carSaleId AND csb.status = :status")
    void updateSaleCancel(@Param("carSaleId") int carSaleId,@Param("bookStatus") int bookStatus, @Param("status") boolean status ,@Param("uptDt") LocalDateTime uptDt);

    CarSaleBookGetDetailMapping findByStatusAndCarSale_SaleStatusNotAndCarSale_Id(@Param("status") boolean status, @Param("carSaleSaleStatus") int carSaleSaleStatus, @Param("carSaleId") int carSaleId);
}
