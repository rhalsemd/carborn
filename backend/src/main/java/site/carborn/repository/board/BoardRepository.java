package site.carborn.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.car.CarImage;

@Repository
public interface BoardRepository extends JpaRepository<CarImage, Integer> {

}
