package site.carborn.controller.company;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.dto.request.RepairResultRequestDTO;
import site.carborn.entity.user.RepairBook;
import site.carborn.entity.user.RepairResult;
import site.carborn.service.company.RepairShopService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

import java.io.IOException;
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
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" ,BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, repairShopService.repairBookList(pageRequest));
    }

    @GetMapping("/book/{repairBookId}")
    @Operation(description = "정비소 정비 예약 상세 조회")
    @Parameter(name = "repairBookId", description = "예약 번호")
    public ResponseEntity<?> repairBookDetailContent(@PathVariable("repairBookId") int repairBookId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, repairShopService.repairBookDetailContent(repairBookId));
    }

    @PutMapping("/book")
    @Operation(description = "정비소 정비 예약 상태 수정 및 검수 데이터 입력")
    @Parameter(name = "repairBookId", description = "예약 번호")
    public ResponseEntity<?> repairBookUpdate(RepairResultRequestDTO dto) throws IOException {
        Optional<RepairBook> updateData = repairShopService.repairBookGetData(dto.getRepairBook().getId());
        if (!updateData.isPresent()) {
            return NormalResponse.toResponseEntity(HttpStatus.BAD_REQUEST, "예약 번호가 잘못되었습니다.");
        }
        //예약 상태 수정
        repairShopService.repairBookUpdate(updateData.get());

        //정비 결과 입력
        repairShopService.repairResultInsert(dto);

        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @GetMapping("result/{repairBookId}")
    @Operation(description = "정비소 정비 완료 상세 조회")
    @Parameter(name = "repairBookId", description = "정비 예약 목록 번호")
    public ResponseEntity<?> repairResultDetailContent(@PathVariable("repairBookId") int repairBookId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,repairShopService.repairResultDetailContent(repairBookId));
    }

    @GetMapping("result/review/{repairResultId}")
    @Operation(description = "정비소 정비 완료 리뷰 조회")
    @Parameter(name = "repairResultId", description = "정비 완료 정비 번호")
    public ResponseEntity<?> repairResultReview(@PathVariable("repairResultId") int repairResultId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,repairShopService.repairResultReview(repairResultId));
    }
}
