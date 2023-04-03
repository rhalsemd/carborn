package site.carborn.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.RepairBook;
import site.carborn.mapping.user.UserRepairBookDetailMapping;
import site.carborn.mapping.user.UserRepairBookListMapping;
import site.carborn.mapping.user.RepairBookGetDetailMapping;
import site.carborn.mapping.user.RepairBookGetListMapping;

@Repository
public interface RepairBookRepository extends JpaRepository<RepairBook, Integer> {
    //예약 목록 조회
//    @Query(value = "SELECT b.ID,b.CAR_ID, b.BOOK_STATUS, b.BOOK_DT, b.REPAIR_SHOP_ID" +
//            "FROM S08P22D209.MWS_REPAIR_BOOK AS b " +
//            "WHERE b.STATUS = 0" ,nativeQuery = true)
    @Query(value = "SELECT b.ID as id, b.BOOK_STATUS as bookStatus, b.BOOK_DT as bookDt, b.REPAIR_SHOP_ID as repairShopId FROM S08P22D209.MWS_REPAIR_BOOK AS b WHERE b.STATUS = :status AND b.ACCOUNT_ID = :accountId"
            ,countQuery = "SELECT b.ID as id, b.BOOK_STATUS as bookStatus, b.BOOK_DT as bookDt, b.REPAIR_SHOP_ID as repairShopId FROM S08P22D209.MWS_REPAIR_BOOK AS b WHERE b.STATUS = :status AND b.ACCOUNT_ID = :accountId",nativeQuery = true)
//    @Query("select b.id, b.account.id, b.car, b.bookStatus, b.bookDt, b.repairShop from RepairBook b where b.status = :status and b.account.id = :accountId")
    Page<Object[]> findByStatusAndAccount_Id(@Param("status") boolean status, @Param("accountId") String accountId, Pageable page);

    //예약 단일 조회
    UserRepairBookDetailMapping findByStatusAndId(@Param("status") boolean status, @Param("id") int id);

    Page<RepairBookGetListMapping> findByStatusAndRepairShop_Id(@Param("status") boolean status, @Param("repairShopId") int repairShopId, Pageable page);

    RepairBookGetDetailMapping findAllById(@Param("id") int id);
}
