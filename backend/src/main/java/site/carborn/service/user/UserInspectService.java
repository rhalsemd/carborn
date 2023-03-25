package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.entity.user.InspectBook;
import site.carborn.entity.user.RepairBook;
import site.carborn.mapping.user.InspectBookGetDetailMapping;
import site.carborn.mapping.user.UserInspectBookDetailMapping;
import site.carborn.mapping.user.UserInspectBookListMapping;
import site.carborn.repository.user.InspectBookRepository;
import site.carborn.repository.user.InspectResultRepository;
import site.carborn.util.board.BoardUtils;

@Service
public class UserInspectService {
    @Autowired
    private InspectBookRepository inspectBookRepository;
    @Autowired
    private InspectResultRepository inspectResultRepository;

    public Page<UserInspectBookListMapping> inspectBookList(String accountId, int page, int size){
        Page<UserInspectBookListMapping> inspectBookList = inspectBookRepository.findByStatusAndAccount_Id(
                BoardUtils.BOARD_DELETE_STATUS_FALSE,
                accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );
        if(inspectBookList.isEmpty()){
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return inspectBookList;
    }

    public UserInspectBookDetailMapping inspectBookDetail(Integer id){
        UserInspectBookDetailMapping inspectBook = inspectBookRepository.findAllByIdAndStatus(id,BoardUtils.BOARD_DELETE_STATUS_FALSE);

        if (inspectBook == null){
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }

        return inspectBook;
    }
}
