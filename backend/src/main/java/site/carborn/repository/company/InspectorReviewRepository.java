package site.carborn.repository.company;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.company.InspectorReview;
import site.carborn.mapping.company.InspectorReviewMapping;

@Repository
public interface InspectorReviewRepository extends JpaRepository<InspectorReview, Integer> {
    InspectorReviewMapping findByStatusAndInspectResult_Id(@Param("status") boolean status, @Param("inspectResultId") int inspectResultId);
}
