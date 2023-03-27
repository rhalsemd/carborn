package site.carborn.controller.common;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.dto.request.AccountRequestDTO;
import site.carborn.service.common.AddressService;
import site.carborn.service.common.JoinService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

import java.util.Map;

@Tag(name = "Join", description = "회원가입 API")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class JoinController {
    @Autowired
    JoinService joinService;

    @Autowired
    AddressService addressService;

    public ResponseEntity<?> join(@RequestBody AccountRequestDTO dto) {
        Map<String, Object> geo = addressService.getGeoAddress(dto.getAddress());
        if (geo.isEmpty()) {
            throw new NullPointerException("위도 및 경도 정보를 받아올 수 없습니다");
        }

        joinService.join(dto, (double) geo.get("lat"), (double) geo.get("lng"));
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }
}
