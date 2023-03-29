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
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.user.Community;
import site.carborn.entity.user.CommunityReview;
import site.carborn.mapping.user.UserCommunityListMapping;
import site.carborn.service.user.UserCommunityService;
import site.carborn.util.board.BoardUtils;
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
    @Parameter(name = "communityId", description = "게시글 id")
    public ResponseEntity<?> getBoardDetail(@PathVariable("communityId") int communityId){
        UserCommunityListMapping boardDetail = userCommunityService.getBoardDetail(communityId);
        return NormalResponse.toResponseEntity(HttpStatus.OK,boardDetail);
    }

    @PostMapping
    @Operation(description = "커뮤니티 글 작성")
    public ResponseEntity<?> createBoard(@RequestBody Community community){
        int result = userCommunityService.createBoard(community);
        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    }

    @PutMapping("/{communityId}")
    @Operation(description = "커뮤니티 글 수정")
    @Parameter(name = "communityId", description = "게시글 id")
    public ResponseEntity<?> updateBoard(@RequestBody Community community,
                                               @PathVariable("communityId") int communityId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userCommunityService.updateBoard(community, communityId));
    }

    @DeleteMapping ("/delete/{communityId}")
    @Operation(description = "커뮤니티 글 삭제")
    @Parameter(name = "communityId", description = "게시글 id")
    public ResponseEntity<?> deleteRepairBook(@PathVariable("communityId") int communityId){
        userCommunityService.deleteBoard(communityId);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    //댓글
    @PostMapping("/comment")
    @Operation(description = "댓글 작성")
    public ResponseEntity<?> createcomment(@RequestBody CommunityReview communityReview){
        int result = userCommunityService.createcomment(communityReview);
        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    }
}
