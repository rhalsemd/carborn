package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.RepairBook;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepairBookRepository extends JpaRepository<RepairBook, Integer> {
    //예약 목록 조회
    List<RepairBook> findByStatusAndAccount_IdOrderByIdDesc(Boolean status, String accountId);

    //예약 단일 조회
    Optional<RepairBook> findByStatusAndId(Boolean status, Integer id);

    //    @Query(value = "SELECT * FROM MWS_REPAIR_BOOK WHERE STATUS = 1 ORDER BY ID DESC", nativeQuery = true)
//    RepairBook loadBookList();
}
