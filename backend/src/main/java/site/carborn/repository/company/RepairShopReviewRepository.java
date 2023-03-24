package site.carborn.repository.company;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.company.RepairShopReview;
import site.carborn.mapping.user.RepairShopReviewGetDetailMapping;


@Repository
public interface RepairShopReviewRepository extends JpaRepository<RepairShopReview, Integer> {
    RepairShopReviewGetDetailMapping findByStatusAndRepairResult_Id(@Param("status") boolean status, @Param("repairResultId") int repairResultId);
}
