package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.InspectResult;
import site.carborn.mapping.user.InspectResultGetDetailMapping;

@Repository
public interface InspectResultRepository extends JpaRepository<InspectResult, Integer> {

    InspectResultGetDetailMapping findAllByInspectBookId(@Param("inspectBookId") int inspectBookId);
}
