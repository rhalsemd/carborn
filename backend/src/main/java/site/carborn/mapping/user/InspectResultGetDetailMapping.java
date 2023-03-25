package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface InspectResultGetDetailMapping {

    int getId();

    int getMileage();

    String getBeforeImgNm();

    String getAfterImgNm();

    String getReceiptImgNm();

    LocalDateTime getInspectDt();

    LocalDateTime getRegDt();
}
