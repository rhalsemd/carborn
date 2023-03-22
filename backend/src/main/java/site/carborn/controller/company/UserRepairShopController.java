package site.carborn.controller.company;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.user.RepairBook;
import site.carborn.service.company.UserRepairShopService;
import site.carborn.util.network.NormalResponse;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/api/user/repair")
@RequiredArgsConstructor
@RestController
public class UserRepairShopController {

    @Autowired
    private UserRepairShopService repairShopService;

    // 사용자의 정비소 예약 목록
    @GetMapping("/book/list/{accountId}")// api/user/repair/book/list/
    public ResponseEntity<List<RepairBook>> getRepairBookList(@PathVariable String accountId) {
        List<RepairBook> repairBookList = repairShopService.repairBookList(accountId);
        System.out.println(LocalDateTime.now());
        return new ResponseEntity<>(repairBookList, HttpStatus.OK);

//        Slice<RepairBookMapping> result = repairShopService.repairBookList(accountId);
//        return
////        Slice<RepairBookMapping> result = repairShopService.repairBookList(accountId);
////        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 정비소 예약 단일 조회
    @GetMapping("/book/{repairBookId}")
    public ResponseEntity<?> getRepairBook(@PathVariable Integer repairBookId){
        RepairBook repairBook = repairShopService.repairBook(repairBookId);
        return new ResponseEntity<>(repairBook, HttpStatus.OK);
    }

    // 사용자 정비소 예약
    @PostMapping("/book/form")
    public String createRepairBook(@RequestBody RepairBook repairBook){
        repairShopService.createRepairBook(repairBook);
        return "reservation complete";
    }

    // 사용자 정비소 예약 삭제
    @DeleteMapping ("/book/delete/{repairBookId}")
    public ResponseEntity<?> deleteRepairBook(@PathVariable Integer repairBookId){
        repairShopService.deleteRepairBook(repairBookId);
        return NormalResponse.toResponseEntity(HttpStatus.OK, "SUCCESS");
    }

    // 사용자 정비소 예약 내역 수정
    @PatchMapping("book/update/{repairBookId}")
    public ResponseEntity<?> updateRepairBook(@PathVariable Integer repairBookId,
                                              @RequestBody RepairBook repairBook){
        repairShopService.updateRepairBook(repairBookId,repairBook);
        return null;
    }

}
