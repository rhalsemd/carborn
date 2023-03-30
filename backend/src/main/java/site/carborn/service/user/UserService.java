package site.carborn.service.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.carborn.dto.request.CarSaleRequestDTO;
import site.carborn.entity.account.Account;
import site.carborn.entity.user.CarSale;
import site.carborn.mapping.user.*;
import site.carborn.repository.car.CarInsuranceHistoryRepository;
import site.carborn.repository.user.CarSaleBookRepository;
import site.carborn.repository.user.CarSaleRepository;
import site.carborn.repository.user.InspectResultRepository;
import site.carborn.repository.user.RepairResultRepository;
import site.carborn.util.common.BookUtils;
import site.carborn.util.common.SellUtils;
import site.carborn.util.common.SortUtils;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private CarSaleRepository carSaleRepository;

    @Autowired
    private CarSaleBookRepository carSaleBookRepository;

    @Autowired
    private InspectResultRepository inspectResultRepository;

    @Autowired
    private RepairResultRepository repairResultRepository;

    @Autowired
    private CarInsuranceHistoryRepository carInsuranceHistoryRepository;

    @Transactional
    public Page<CarSaleRequestDTO> getSaleList(Pageable pageable) {
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

    @Transactional
    public Page<CarSaleRequestDTO> getSaleListOrderByPrice(Pageable pageable, int orderby) {
        Page<Object[]> page = null;
        if(orderby == SortUtils.SORT_STATUS_PRICE_DESC){
            page = carSaleRepository.findAllPageOrderByPriceDESC(false, SellUtils.SELL_STATUS_CANCEL, pageable);
        }
        else if(orderby == SortUtils.SORT_STATUS_PRICE_ASC){
            page = carSaleRepository.findAllPageOrderByPriceASC(false, SellUtils.SELL_STATUS_CANCEL, pageable);
        }
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

    @Transactional
    public CarSaleBookGetDetailMapping getSaleDetail(int carSaleId){
        return carSaleBookRepository.findByStatusAndCarSale_SaleStatusNotAndCarSale_Id(false, SellUtils.SELL_STATUS_CANCEL,carSaleId);
    }

    @Transactional
    public Page<UserInspectResultListMapping> getSaleInspectList(int carId, Pageable page){
        return inspectResultRepository.findByInspectBook_Car_Id(carId, page);
    }

    @Transactional
    public Page<UserRepairResultListMapping> getSaleRepairList(int carId, Pageable page){
        return repairResultRepository.findByRepairBook_Car_Id(carId, page);
    }

    @Transactional
    public Page<UserInsuranceListMapping> getSaleInsuranceList(int carId, Pageable page){
        return carInsuranceHistoryRepository.findAllByCar_Id(carId, page);
    }

    @Transactional
    public void insertCarSale(CarSale carSale){
        //현재는 임시아이디 시큐리티에서 받는 부분
        String userid = "testuser2";

        carSale.setAccount(new Account());
        carSale.getAccount().setId(userid);
        carSale.setSaleStatus(SellUtils.SELL_STATUS_STAY);
        carSale.setRegDt(LocalDateTime.now());
        carSale.setUptDt(LocalDateTime.now());
        carSale.setStatus(false);

        carSaleRepository.save(carSale);
    }
}
