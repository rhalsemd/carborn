package site.carborn.controller.company;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.company.RepairShop;
import site.carborn.entity.user.RepairBook;
import site.carborn.service.company.UserRepairShopService;

import java.util.List;

@RequestMapping("/api/user/repair")
@RequiredArgsConstructor
@RestController
public class UserRepairShopController {

    @Autowired
    private UserRepairShopService repairShopService;

    // 정비소 예약 목록
    @GetMapping("/book/list/{accountId}")
    public ResponseEntity<List<RepairBook>> getRepairBookList(@PathVariable String accountId) {
        List<RepairBook> repairBookList = repairShopService.repairBookList(accountId);
        return new ResponseEntity<>(repairBookList, HttpStatus.OK);
    }

    // 정비소 예약 단일 조회
//    @GetMapping("/book/{repairId}")
//    public ResponseEntity<?> getRepairBook(@PathVariable Integer repairId){
//        RepairBook repairBook = repairShopService.repairBook(repairId);
//        return new ResponseEntity<>(repairBook, HttpStatus.OK);
//    }

    // 사용자 정비소 예약
//    @PostMapping("/book")
//    public ResponseEntity<?> createRepairBook()
}
