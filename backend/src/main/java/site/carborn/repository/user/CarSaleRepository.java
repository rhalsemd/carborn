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
import java.util.List;
import java.util.Map;

@Repository
public interface CarSaleRepository extends JpaRepository<CarSale, Integer> {
    Long countByStatusAndSaleStatus(@Param("status") boolean status,@Param("saleStatus") int saleStatus);

    @Query(value = """
    SELECT sale.ID, sale.CAR_ID, sale.PRICE, sale.REG_DT, sale.UPT_DT, sale.MAKER, sale.MODEL_NM, sale.MODEL_YEAR, sale.MILEAGE, img.IMG_NM
    FROM\s
    	(SELECT mcs.ID, mcs.CAR_ID, mcs.PRICE, mcs.REG_DT, mcs.UPT_DT, mc.MAKER, mc.MODEL_NM, mc.MODEL_YEAR, mc.MILEAGE\s
    	FROM S08P22D209.MWS_CAR_SALE mcs
    	INNER JOIN S08P22D209.MWS_CAR mc
    	ON mcs.CAR_ID = mc.ID
    	WHERE mcs.STATUS = :status AND mcs.SALE_STATUS = :saleStatus) sale
    LEFT OUTER JOIN\s
    	(SELECT CAR_ID, IMG_NM FROM S08P22D209.MWS_CAR_IMG mci GROUP BY CAR_ID) img
    ON sale.CAR_ID = img.CAR_ID
    ORDER BY sale.ID DESC\s
    LIMIT 7
    """,nativeQuery = true)
    List<Map<String,String>> getNewCarHomeData(@Param("status") boolean status, @Param("saleStatus") int saleStatus);

    Page<CarSaleGetListMapping> findAllByStatusAndAccountId(@Param("status") boolean status, @Param("accountId") String accountId, Pageable page);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE CarSale cs SET cs.saleStatus = :saleStatus, cs.uptDt = :uptDt WHERE cs.id = :id AND cs.status = :status")
    void updateSaleCancel(@Param("id") int id,@Param("status") boolean status, @Param("saleStatus") int saleStatus, @Param("uptDt") LocalDateTime uptDt);
}
