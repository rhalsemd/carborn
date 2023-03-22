package site.carborn.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.RepairBook;
import site.carborn.mapping.user.RepairBookGetListMapping;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepairBookRepository extends JpaRepository<RepairBook, Integer> {
    //예약 목록 조회
    List<RepairBook> findByStatusAndAccount_IdOrderByIdDesc(Boolean status, String accountId);

    //예약 단일 조회
    Optional<RepairBook> findByStatusAndId(Boolean status, Integer id);

    //예약 입력(예약신청)

    Page<RepairBookGetListMapping> findByStatusAndRepairShop_Id(boolean status, int repairShopId, Pageable page);

}
