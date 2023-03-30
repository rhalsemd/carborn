package site.carborn.repository.user;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.user.Community;
import site.carborn.mapping.user.UserCommunityListMapping;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Integer> {
    Page<UserCommunityListMapping> findByStatus(@Param("status") boolean status, Pageable page);

    UserCommunityListMapping findAllByIdAndStatus(int communityId, boolean status);


}
