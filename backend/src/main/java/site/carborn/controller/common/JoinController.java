package site.carborn.controller.common;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.dto.request.AccountRequestDTO;
import site.carborn.service.common.AddressService;
import site.carborn.service.common.JoinService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.AuthUtils;
import site.carborn.util.network.NormalResponse;

import java.util.HashMap;
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

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody AccountRequestDTO dto) {
        Map<String, Object> geo = null;

        if (dto.getAuth() != AuthUtils.AUTH_USER) {
            geo = addressService.getGeoAddress(dto.getAddress());

            if (geo.isEmpty()) {
                throw new NullPointerException("위도 및 경도 정보를 받아올 수 없습니다");
            }
        }
        
        if (geo == null) {
            geo = new HashMap<>();
        }

        joinService.join(dto, geo);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }
}
