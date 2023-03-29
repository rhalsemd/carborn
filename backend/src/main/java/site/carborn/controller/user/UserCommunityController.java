package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
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
import site.carborn.mapping.user.UserCommunityListMapping;
import site.carborn.mapping.user.UserInspectBookDetailMapping;
import site.carborn.service.user.UserCommunityService;
import site.carborn.util.network.NormalResponse;

@Tag(name = "커뮤니티")
@RequestMapping("/api/user/community")
@RequiredArgsConstructor
@RestController
public class UserCommunityController{

    @Autowired
    private UserCommunityService userCommunityService;

    @GetMapping("/list/{page}/{size}")
    @Operation(description = "커뮤니티 글 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 당 게시물 수")
    })
    public ResponseEntity<?> getBoardList(@PathVariable("page") int page,
                                                @PathVariable("size") int size){
        Page<UserCommunityListMapping> boardList = userCommunityService.getBoardList(page,size);
        return NormalResponse.toResponseEntity(HttpStatus.OK,boardList);
    }

    @GetMapping("/{communityId}")
    @Operation(description = "커뮤니티 글 단일 조회")
    @Parameter(name = "inspectId", description = "예약글 id")
    public ResponseEntity<?> getBoardDetail(@PathVariable("communityId") int communityId){
        UserCommunityListMapping boardDetail = userCommunityService.getBoardDetail(communityId);
        return NormalResponse.toResponseEntity(HttpStatus.OK,boardDetail);
    }

}
