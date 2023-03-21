package site.carborn.service.company;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.carborn.dto.request.UserRepairBookRequestDTO;
import site.carborn.entity.account.Account;
import site.carborn.entity.car.Car;
import site.carborn.entity.company.RepairShop;
import site.carborn.entity.user.RepairBook;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.user.RepairBookRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserRepairShopService {
    @Autowired
    private RepairBookRepository repairBookRepository;

    public List<RepairBook> repairBookList(String accountId) {
        List<RepairBook> repairBooks = repairBookRepository.findByStatusAndAccount_IdOrderByIdDesc(false, accountId);
//        System.out.println("repairBook는"+repairBook);
        return repairBooks;
    }

    public RepairBook repairBook(Integer id){
        Optional<RepairBook> repairBook = repairBookRepository.findByStatusAndId(false, id);
        return repairBook.get();
    }

//    @Transactional
//    public void createRepairBook(UserRepairBookRequestDTO dto){
//
//        Car car = new Car();
//        car.setId(dto.getCarId());
//
//        RepairShop repairShop = new RepairShop();
//        repairShop.setId(dto.getRepairShopId());
//
//        Account account = new Account();
//        account.setId(dto.getAccount());
//
//
////        LocalDateTime LocalDate ;
//        RepairBook repairBookRequest = RepairBook.builder()
//                .car(car)
//                .repairShop(repairShop)
//                .account(account)
//                .content(dto.getContent())
//                .bookStatus(0)
//                .bookDt(dto.getBookDt())
//                .regDt(LocalDateTime.now())
//                .uptDt(LocalDateTime.now())
//                .status(false)
//                .build();
//        System.out.println(repairBookRequest);
//        repairBookRepository.save(repairBookRequest);
//
//    }

    @Transactional
    public void createRepairBook(RepairBook repairBook){
        repairBook.setRegDt(LocalDateTime.now());
        repairBook.setUptDt(LocalDateTime.now());
        repairBook.setBookStatus(0);
        repairBook.setStatus(false);
        repairBookRepository.save(repairBook);
    }


}
