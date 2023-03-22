package site.carborn.controller.company;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.user.RepairBook;
import site.carborn.entity.user.RepairResult;
import site.carborn.service.company.RepairShopService;
import site.carborn.util.common.BookUtils;
import site.carborn.util.network.NormalResponse;

import java.time.LocalDateTime;
import java.util.Optional;

@Tag(name = "RepairShop", description = "정비소 정비 관련 API")
@RequestMapping("/api/repair-shop")
@RequiredArgsConstructor
@RestController
public class RepairShopController {

    @Autowired
    private RepairShopService repairShopService;

    @GetMapping("/book/list/{page}/{size}")
    @Operation(description = "정비소 정비 예약 전체 목록")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 사이즈")
    })
    public ResponseEntity<?> repairBookList(@PathVariable("page") int page, @PathVariable("size") int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return NormalResponse.toResponseEntity(HttpStatus.OK, repairShopService.repairBookList(pageRequest));
    }

    @GetMapping("book/{repairBookId}")
    @Operation(description = "정비소 정비 예약 상세 조회")
    @Parameter(name = "repairBookId", description = "예약 번호")
    public ResponseEntity<?> repairBookDetailContent(@PathVariable("repairBookId") int repairBookId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, repairShopService.repairBookDetailContent(repairBookId));
    }

    @PutMapping("book/{repairBookId}")
    @Operation(description = "정비소 정비 예약 상태 수정 및 검수 데이터 입력")
    @Parameter(name = "repairBookId", description = "예약 번호")
    public ResponseEntity<?> repairBookUpdate(@PathVariable("repairBookId") int repairBookId, @RequestBody RepairResult repairResult) {
        Optional<RepairBook> updateData = repairShopService.repairBookUpdateData(repairBookId);
        if (!updateData.isPresent()) {
            return NormalResponse.toResponseEntity(HttpStatus.BAD_REQUEST, "예약 번호가 잘못되었습니다.");
        }
        updateData.get().setBookStatus(BookUtils.BOOK_STATUS_COMPLETE);
        updateData.get().setUptDt(LocalDateTime.now());
        repairShopService.repairBookUpdate(updateData.get());

        repairResult.setRepairBook(new RepairBook());
        repairResult.getRepairBook().setId(repairBookId);
        repairResult.setRegDt(LocalDateTime.now());
        //multipartfile 입력 부분

        repairShopService.repairResultInsert(repairResult);

        //caver 입력 부분

        return NormalResponse.toResponseEntity(HttpStatus.OK, "예약 상태 수정 및 데이터 입력 완료");
    }

    @GetMapping("/result/list/{page}/{size}")
    @Operation(description = "정비소 정비 완료 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 사이즈")
    })
    public ResponseEntity<?> repairResultList(@PathVariable("page") int page, @PathVariable("size") int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return NormalResponse.toResponseEntity(HttpStatus.OK, repairShopService.repairResultGetList(pageRequest));
    }

    @GetMapping("result/{repairResultId}")
    @Operation(description = "정비소 정비 완료 상세 조회")
    @Parameter(name = "repairResultId", description = "정비 완료 목록 번호")
    public ResponseEntity<?> repairResultDetailContent(@PathVariable("repairResultId") int repairResultId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,repairShopService.repairResultDetailContent(repairResultId));
    }
}
