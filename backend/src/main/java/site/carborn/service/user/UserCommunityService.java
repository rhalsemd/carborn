package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.mapping.user.UserCommunityListMapping;
import site.carborn.repository.user.CommunityRepository;
import site.carborn.util.board.BoardUtils;

@Service
public class UserCommunityService {
    @Autowired
    private CommunityRepository communityRepository;

    public Page<UserCommunityListMapping> getBoardList(int page, int size){
        Page<UserCommunityListMapping> getBoardList = communityRepository.findByStatus(
                BoardUtils.BOARD_DELETE_STATUS_FALSE
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );
        if(getBoardList.isEmpty()){
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return getBoardList;
    }
}
