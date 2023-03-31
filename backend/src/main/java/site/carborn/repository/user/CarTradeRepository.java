package site.carborn.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.CarTrade;

@Repository
public interface CarTradeRepository extends JpaRepository<CarTrade, Integer> {
    
}
