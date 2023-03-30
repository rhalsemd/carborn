package site.carborn.service.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.dto.request.CarSaleRequestDTO;
import site.carborn.repository.user.CarSaleRepository;
import site.carborn.util.common.SellUtils;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private CarSaleRepository carSaleRepository;

    @Transactional
    public Page<CarSaleRequestDTO> getsaleList(Pageable pageable) {
        Page<Object[]> page = carSaleRepository.findAllPage(false, SellUtils.SELL_STATUS_CANCEL, pageable);
        return page.map(objects -> {
            CarSaleRequestDTO dto = new CarSaleRequestDTO();
            dto.setId((int) objects[0]);
            dto.setAccountId((String) objects[1]);
            dto.setCarId((int) objects[2]);
            dto.setMaker((String) objects[3]);
            dto.setModelNm((String) objects[4]);
            dto.setModelYear((String) objects[5]);
            dto.setMileage((int) objects[6]);
            dto.setContent((String) objects[7]);
            dto.setPrice((int) objects[8]);
            dto.setSaleStatus((byte) objects[9]);
            dto.setRegDt((Timestamp) objects[10]);
            dto.setUptDt((Timestamp) objects[11]);
            dto.setImgNm((String) objects[12]);
            return dto;
        });
    }
}
