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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.service.company.RepairShopService;
import site.carborn.util.network.NormalResponse;

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
    public ResponseEntity<?> repairBookList(@PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id").descending());
        return NormalResponse.toResponseEntity(HttpStatus.OK, repairShopService.repairBookList(pageRequest));
    }
}
