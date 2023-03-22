package site.carborn.util.board;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BoardUtils {
    public static final int PAGE_PER_ROW_5 = 5;
    public static final int PAGE_PER_ROW_20 = 20;

    public static final String ORDER_BY_ASC = "ASC";
    public static final String ORDER_BY_DESC = "DESC";

    public static final boolean BOARD_DELETE_STATUS_FALSE = false;
    public static final boolean BOARD_DELETE_STATUS_TRUE = true;

    public static final String BOARD_CRUD_SUCCESS = "SUCCESS";

    public static PageRequest pageRequestInit(int pageNum, int rowPerPage, String sortBy, String orderBy) {
        if (orderBy == BoardUtils.ORDER_BY_ASC) {
            return PageRequest.of(pageNum - 1, rowPerPage, Sort.by(sortBy));
        } else if (orderBy == BoardUtils.ORDER_BY_DESC) {
            return PageRequest.of(pageNum - 1, rowPerPage, Sort.by(sortBy).descending());
        }

        return null;
    }

    /**
     * 이미지 파일 확장자 검증
     * @param fileExtension
     * @return boolean
     */
    public static boolean checkImageFileExtension(String fileExtension) {
        List<String> extensions = Arrays.asList("jpg", "jpeg", "png", "gif");
        for (String extension: extensions) {
            if (extension.equals(fileExtension)) {
                return true;
            }
        }

        throw new RuntimeException("파일 확장자가 일치하지 않습니다");
    }
}
