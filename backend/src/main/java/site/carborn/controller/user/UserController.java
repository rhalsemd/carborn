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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.dto.request.CarSaleRequestDTO;
import site.carborn.service.user.UserService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.SortUtils;
import site.carborn.util.network.NormalResponse;

@Tag(name = "사용자 구매 및 판매", description = "사용자 구매 및 판매 관련 기능")
@RequestMapping("/api/user/car")
@RequiredArgsConstructor
@RestController
public class UserController {

    @Autowired
    private UserService userService;

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
            result=userService.getsaleList(pageRequest);
        }
        return NormalResponse.toResponseEntity(HttpStatus.OK,result);
    }

}
