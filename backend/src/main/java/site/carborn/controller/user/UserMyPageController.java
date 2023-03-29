package site.carborn.controller.user;

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
import site.carborn.dto.request.CarRequestDTO;
import site.carborn.entity.car.Car;
import site.carborn.service.user.UserMyPageService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

import java.io.IOException;

@Tag(name = "UserMyPage", description = "UserMypage 관련 API")
@RequestMapping("/api/user")
@RequiredArgsConstructor
@RestController
public class UserMyPageController {

    @Autowired
    private UserMyPageService userMyPageService;

    @PostMapping("/car")
    @Operation(description = "차량 등록")
    public ResponseEntity<?> addCar(@ModelAttribute CarRequestDTO dto) throws IOException {
        Car car = userMyPageService.insertCar(dto);
        userMyPageService.insertCarImage(dto,car);
        userMyPageService.insertCarVrc(dto,car);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @GetMapping("/car/list/{page}/{size}")
    @Operation(description = "차량 목록")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 사이즈")
    })
    public ResponseEntity<?> getCarList(@PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" ,BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, userMyPageService.getCarList(pageRequest));
    }
}
