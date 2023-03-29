package site.carborn.controller.common;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.entity.common.SmsAuth;
import site.carborn.service.common.SmsService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

@Slf4j
@Tag(name = "SMS", description = "문자 인증 API")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class SmsController {
    @Autowired
    SmsService smsService;

    @PostMapping("/sms-auth-send")
    public ResponseEntity<?> smsAuthSend(@RequestBody SmsAuth smsAuth) {
        String phoneNm = smsAuth.getPhoneNm();
        if (phoneNm == null || phoneNm.isBlank()) {
            throw new NullPointerException("휴대전화 번호를 입력해주세요");
        }

        smsService.smsAuthSend(smsAuth);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }
}
