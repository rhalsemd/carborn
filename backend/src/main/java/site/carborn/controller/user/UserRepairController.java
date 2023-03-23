package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.user.RepairBook;
import site.carborn.mapping.user.UserRepairBookListMapping;
import site.carborn.mapping.user.UserRepairResultListMapping;
import site.carborn.service.user.UserRepairService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;


@RequestMapping("/api/user/repair")
@RequiredArgsConstructor
@RestController
public class UserRepairController {

    @Autowired
    private UserRepairService userRepairService;

    // 정비 예약 관리
    @GetMapping("/book/list/{page}")// api/user/repair/book/list/0/3
    @Operation(description = "사용자의 정비소 예약 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호")
    })
    public ResponseEntity<?> getRepairBookList(@PathVariable("page") int page) {
        String accountId = "testuser2"; //스프링시큐리티 구현시 변경예정
//        PageRequest pageRequest = PageRequest.of(page, size,Sort.by("id").descending());
        Page<UserRepairBookListMapping> result = userRepairService.repairBookList(accountId,page);
        return NormalResponse.toResponseEntity(HttpStatus.OK,result);
    }

    @GetMapping("/book/{repairBookId}")
    @Operation(description = "정비소 예약 단일 조회")
    @Parameter(name = "repairBookId", description = "예약 게시글 id")
    public ResponseEntity<?> getRepairBook(@PathVariable("repairBookId") Integer repairBookId){
        UserRepairBookListMapping repairBook = userRepairService.repairBook(repairBookId);
        return NormalResponse.toResponseEntity(HttpStatus.OK,repairBook);
    }

    @PostMapping("/book")
    @Operation(description = "사용자 정비소 예약")
    public ResponseEntity<?> createRepairBook(@RequestBody RepairBook repairBook){
        userRepairService.createRepairBook(repairBook);
        return NormalResponse.toResponseEntity(HttpStatus.OK, userRepairService.createRepairBook(repairBook));
    }

    @DeleteMapping ("/book/delete/{repairBookId}")
    @Operation(description = "사용자 정비소 예약 삭제")
    @Parameter(name = "repairBookId", description = "예약 게시글 id")
    public ResponseEntity<?> deleteRepairBook(@PathVariable("repairBookId") Integer repairBookId){
        userRepairService.deleteRepairBook(repairBookId);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @PutMapping("/book")
    @Operation(description = "사용자 정비소 예약 내역 수정")
    public ResponseEntity<?> updateRepairBook(@RequestBody RepairBook repairBook){
        return NormalResponse.toResponseEntity(HttpStatus.OK, userRepairService.updateRepairBook(repairBook));
    }


    //정비 완료 관리
    @GetMapping("/result/list/{page}")
    @Operation(description = "사용자의 정비 완료 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호")
    })
    public ResponseEntity<?> getRepairResultList(@PathVariable("page") int page){
        String accountId = "testuser2"; //스프링시큐리티 구현시 변경예정
        Page<UserRepairResultListMapping> result = userRepairService.repairResultList(accountId,page);
        return NormalResponse.toResponseEntity(HttpStatus.OK,result);
    }


}
