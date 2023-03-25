package site.carborn.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.RepairResult;
import site.carborn.mapping.user.RepairResultGetDetailMapping;
import site.carborn.mapping.user.RepairResultGetListMapping;
import site.carborn.mapping.user.UserRepairResultDetailMapping;
import site.carborn.mapping.user.UserRepairResultListMapping;

@Repository
public interface RepairResultRepository extends JpaRepository<RepairResult, Integer> {
    Page<RepairResultGetListMapping> findByRepairBook_RepairShop_Id(int repairBookRepairShopId, Pageable page);

    RepairResultGetDetailMapping findAllById(int id);

    Page<UserRepairResultListMapping> findByRepairBook_StatusAndRepairBook_Account_Id(Boolean repairBookStatus, String repairBookAccountId, Pageable page);

}
