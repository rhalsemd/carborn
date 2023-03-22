package site.carborn.repository.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.InspectBook;
import site.carborn.mapping.user.InspectBookGetDetailMapping;
import site.carborn.mapping.user.InspectBookGetListMapping;

@Repository
public interface InspectBookRepository extends JpaRepository<InspectBook, Integer> {
    Page<InspectBookGetListMapping> findByStatusAndInspector_Id(boolean status,int inspectorAccountId, Pageable page);

    InspectBookGetDetailMapping findAllById(int id);
}
