package site.carborn.mapping.user;

import jakarta.persistence.Column;

import java.time.LocalDateTime;

public interface UserInspectResultListMapping {
    int getId();
    int getInspectBookId();
    String getContent();
    int getMileage();
    String getBeforeImgNm();

    String getAfterImgNm();

    String getReceiptImgNm();

    LocalDateTime getInspectDt();

    LocalDateTime getRegDt();
}
