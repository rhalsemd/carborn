package site.carborn.service;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.entity.board.Board;
import site.carborn.repository.board.BoardRepository;
import site.carborn.util.board.BoardUtils;

@Slf4j
@Service
@Transactional
public class BoardService {
    @Autowired
    BoardRepository boardRepository;

    public Page<Board> getBoardList(int page) {
        return boardRepository.findAllByStatus(
                BoardUtils.BOARD_DELETE_STATUS_FALSE
                ,BoardUtils.pageRequestInit(
                        page
                        ,BoardUtils.PAGE_PER_ROW_20
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );
    }
}
