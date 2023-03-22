package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface RepairResultGetDetailMapping {

    int getId();

    String getContent();

    int getMileage();

    String getBeforeImgNm();

    String getAfterImgNm();

    String getReceiptImgNm();

    LocalDateTime getRepairDt();

    LocalDateTime getRegDt();

}
