package site.carborn.repository.car;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.CarInsuranceHistory;
import site.carborn.mapping.car.CarInsuranceHistoryGetDetailMapping;
import site.carborn.mapping.car.CarInsuranceHistoryGetListMapping;
import site.carborn.mapping.user.UserInsuranceListMapping;

@Repository
public interface CarInsuranceHistoryRepository extends JpaRepository<CarInsuranceHistory, Integer> {
    Page<CarInsuranceHistoryGetListMapping> findAllByInsuranceCompany_Id(int insuranceCompany_Id, Pageable page);

    CarInsuranceHistoryGetDetailMapping findAllById(int id);

    Page<UserInsuranceListMapping> findByCar_Account_Id(String accountId,Pageable page);

}
