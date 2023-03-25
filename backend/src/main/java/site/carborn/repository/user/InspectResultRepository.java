package site.carborn.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.InspectResult;
import site.carborn.mapping.user.InspectResultGetDetailMapping;
import site.carborn.mapping.user.InspectResultGetListMapping;

@Repository
public interface InspectResultRepository extends JpaRepository<InspectResult, Integer> {
    Page<InspectResultGetListMapping> findByInspectBook_Inspector_Id(int inspectorBookInspectorId, Pageable page);

    InspectResultGetDetailMapping findAllById(int id);
}
