package site.carborn.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.InspectResult;
import site.carborn.mapping.user.InspectResultGetDetailMapping;
import site.carborn.mapping.user.UserInspectResultListMapping;

@Repository
public interface InspectResultRepository extends JpaRepository<InspectResult, Integer> {

    InspectResultGetDetailMapping findAllByInspectBookId(@Param("inspectBookId") int inspectBookId);

    Page<UserInspectResultListMapping> findByInspectBook_StatusAndInspectBook_Account_Id(Boolean InspectBookStatus, String InspectBookAccountId, Pageable page);
}
