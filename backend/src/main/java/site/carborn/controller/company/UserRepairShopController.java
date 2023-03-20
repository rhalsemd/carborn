package site.carborn.controller.company;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.dto.request.UserRepairBookRequestDTO;
import site.carborn.entity.company.RepairShop;
import site.carborn.entity.user.RepairBook;
import site.carborn.repository.user.RepairBookRepository;
import site.carborn.repository.user.mapping.RepairBookMapping;
import site.carborn.service.company.UserRepairShopService;

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

    // 사용자 정비소 예약 @RequestBody
    @PostMapping("/book/form")
    public String createRepairBook(@RequestBody UserRepairBookRequestDTO dto){
        repairShopService.createRepairBook(dto);
        return "succes!!";
    }
//    @PostMapping("/book/form")
//
//    public String createRepairBook(
//            @RequestParam("car_id") int carId,
//            @RequestParam("repairShop_id") int repairShopId,
//            @RequestParam("account") String account,
//            @RequestParam("content") String content
//    ) {
//        UserRepairBookRequestDTO dto = new UserRepairBookRequestDTO();
//        dto.setCarId(carId);
//        dto.setRepairShopId(repairShopId);
//        dto.setAccount(account);
//        dto.setContent(content);
//
//        repairShopService.createRepairBook(dto);
//        return "success!!";
//    }
}
