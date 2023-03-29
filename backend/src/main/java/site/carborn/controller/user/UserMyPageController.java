package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
}
