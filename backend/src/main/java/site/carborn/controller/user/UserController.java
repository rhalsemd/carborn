package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.dto.request.CarSaleRequestDTO;
import site.carborn.entity.user.CarSale;
import site.carborn.mapping.car.CarImageGetDataMapping;
import site.carborn.mapping.car.CarVrcGetDataMapping;
import site.carborn.mapping.user.*;
import site.carborn.service.user.*;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.SortUtils;
import site.carborn.util.network.NormalResponse;

import java.util.HashMap;
import java.util.List;

@Tag(name = "사용자 구매 및 판매", description = "사용자 구매 및 판매 관련 기능")
@RequestMapping("/api/user/car")
@RequiredArgsConstructor
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMyPageService userMyPageService;

    @GetMapping("/sale/list/{page}/{size}/{sortType}")
    @Operation(description = "판매 차량 목록")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 당 게시물 수"),
            @Parameter(name = "sortType", description = "정렬 방법")
    })
    public ResponseEntity<?> getSaleList(@PathVariable("page") int page, @PathVariable("size") int size, @PathVariable("sortType") int sortType){
        Page<CarSaleRequestDTO> result = null;
        if(sortType == SortUtils.SORT_STATUS_NEW){
            PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" ,BoardUtils.ORDER_BY_DESC);
            result=userService.getSaleList(pageRequest);
        }
        else if(sortType == SortUtils.SORT_STATUS_OLD){
            PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" ,BoardUtils.ORDER_BY_ASC);
            result=userService.getSaleList(pageRequest);
        }
        else if(sortType == SortUtils.SORT_STATUS_PRICE_DESC){
            PageRequest pageRequest = PageRequest.of(page-1, size);
            result=userService.getSaleListOrderByPrice(pageRequest,sortType);
        }
        else if(sortType == SortUtils.SORT_STATUS_PRICE_ASC){
            PageRequest pageRequest = PageRequest.of(page-1, size);
            result=userService.getSaleListOrderByPrice(pageRequest,sortType);
        }

        return NormalResponse.toResponseEntity(HttpStatus.OK,result);
    }

    @GetMapping("/sale/{carSaleId}/{page}/{size}")
    @Operation(description = "판매 차량 상세 조회")
    @Parameters({
            @Parameter(name = "carSaleId", description = "판매 글 번호"),
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 당 게시물 수")
    })
    public ResponseEntity<?> getCarSaleDetail(@PathVariable("carSaleId") int carSaleId, @PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" ,BoardUtils.ORDER_BY_DESC);

        CarSaleGetDetailMapping csgdm = userService.getSaleDetail(carSaleId);
        CarSaleBookGetBookStatusMapping csbgbsm = userService.getSaleBookStatus(carSaleId);
        List<CarImageGetDataMapping> cigdm = userMyPageService.getImageList(csgdm.getCarId());
        CarVrcGetDataMapping cvgdm = userMyPageService.getCarVrcData(csgdm.getCarId());
        Page<UserInsuranceListMapping> uirlm = userService.getSaleInsuranceList(csgdm.getCarId(),pageRequest);
        Page<UserRepairResultListMapping> urrlm = userService.getSaleRepairList(csgdm.getCarId(),pageRequest);
        Page<UserInspectResultListMapping> uiprlm = userService.getSaleInspectList(csgdm.getCarId(),pageRequest);

        HashMap<String, Object> returnData = new HashMap<>();
        returnData.put("detail", csgdm);
        returnData.put("bookStatus",csbgbsm);
        returnData.put("img",cigdm);
        returnData.put("vrc",cvgdm);
        returnData.put("insurance", uirlm);
        returnData.put("repair", urrlm);
        returnData.put("inspect", uiprlm);
        return NormalResponse.toResponseEntity(HttpStatus.OK,returnData);
    }

    @PostMapping("/sell")
    @Operation(description = "판매 차량 등록")
    public ResponseEntity<?> insertCarSell(@RequestBody CarSale carSale){
        userService.insertCarSale(carSale);
        return NormalResponse.toResponseEntity(HttpStatus.OK,"");
    }
}
