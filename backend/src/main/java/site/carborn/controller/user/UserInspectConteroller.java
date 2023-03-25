package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.mapping.user.UserInspectBookListMapping;
import site.carborn.service.user.UserInspectService;
import site.carborn.util.network.NormalResponse;

@Tag(name = "사용자 Inspector 조회", description = "사용자가 Inspector에 대한 정보를 조회하는 경우")
@RequestMapping("/api/user/inspect")
@RequiredArgsConstructor
@RestController
public class UserInspectConteroller {
    @Autowired
    private UserInspectService userInspectService;

    // 검수 예약 관리
    @GetMapping("/book/list/{page}/{size}")
    public ResponseEntity<?> getInspectBookList(@PathVariable("page") int page,
                                                @PathVariable("size") int size){
        String accountId = "usertest";
        Page<UserInspectBookListMapping> result = userInspectService.inspectBookList(accountId,page,size);
        return NormalResponse.toResponseEntity(HttpStatus.OK,result);
    }

}
