package site.carborn.repository.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.carborn.entity.account.Account;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    @Query("SELECT a FROM Account a WHERE a.id = :id")
    Account findById(@Param("id") String accountId);

    @Query(value = "SELECT a FROM Account a WHERE a.phoneNo like :phoneNo and u.name like :name", nativeQuery = true)
    Optional<Account> findByPhoneNoAndName(@Param("phoneNo") String phoneNo, @Param("name") String name);

    @Query(value = "SELECT a FROM Account a WHERE a.id like :id and a.phoneNo like :phoneNo and u.name like :name", nativeQuery = true)
    Optional<Account> findByIdAndPhoneNoAndName(@Param("id") String id, @Param("phoneNo") String phoneNo, @Param("name") String name);
}
