package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.user.RepairBook;
import site.carborn.mapping.user.repairListMapping;
import site.carborn.service.user.UserRepairShopService;
import site.carborn.util.network.NormalResponse;


@RequestMapping("/api/user/repair")
@RequiredArgsConstructor
@RestController
public class UserRepairShopController {

    @Autowired
    private UserRepairShopService repairShopService;

    @GetMapping("/book/list/{page}/{size}")// api/user/repair/book/list/0/3
    @Operation(description = "사용자의 정비소 예약 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "한 페이지 게시물 수")
    })
    public ResponseEntity<Page<repairListMapping>> getRepairBookList(@PathVariable("size") int size,
                                                              @PathVariable("page") int page) {
        String accountId = "testuser2"; //스프링시큐리티 구현시 변경예정
        PageRequest pageRequest = PageRequest.of(page, size,Sort.by("id").descending());
        Page<repairListMapping> result = repairShopService.repairBookList(accountId,pageRequest);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/book/{repairBookId}")
    @Operation(description = "정비소 예약 단일 조회")
    @Parameter(name = "repairBookId", description = "예약 게시글 id")
    public ResponseEntity<repairListMapping> getRepairBook(@PathVariable("repairBookId") Integer repairBookId){
        repairListMapping repairBook = repairShopService.repairBook(repairBookId);
        return new ResponseEntity<>(repairBook, HttpStatus.OK);
    }

    @PostMapping("/book")
    @Operation(description = "사용자 정비소 예약")
    public Object createRepairBook(@RequestBody RepairBook repairBook){
        repairShopService.createRepairBook(repairBook);
        return NormalResponse.toResponseEntity(HttpStatus.OK, "SUCCESS");
    }

    @DeleteMapping ("/book/delete/{repairBookId}")
    @Operation(description = "사용자 정비소 예약 삭제")
    @Parameter(name = "repairBookId", description = "예약 게시글 id")
    public Object deleteRepairBook(@PathVariable("repairBookId") Integer repairBookId){
        repairShopService.deleteRepairBook(repairBookId);
        return NormalResponse.toResponseEntity(HttpStatus.OK, "SUCCESS");
    }

    @PatchMapping("book/update/{repairBookId}")
    @Operation(description = "사용자 정비소 예약 내역 수정")
    @Parameter(name = "repairBookId", description = "예약 게시글 id")
    public Object updateRepairBook(@PathVariable("repairBookId") Integer repairBookId,
                                              @RequestBody RepairBook repairBook){
        repairShopService.updateRepairBook(repairBookId,repairBook);
        return NormalResponse.toResponseEntity(HttpStatus.OK, "SUCCESS");
    }

}
