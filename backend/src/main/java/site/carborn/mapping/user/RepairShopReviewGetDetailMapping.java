package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface RepairShopReviewGetDetailMapping {

    int getRepairResultId();

    String getRepairResultContent();

    int getRepairResultMileage();

    String getRepairResultBeforeImgNm();

    String getRepairResultAfterImgNm();

    String getRepairResultReceiptImgNm();

    LocalDateTime getRepairResultRepairDt();

    LocalDateTime getRepairResultRegDt();

    String getAccountId();

    String getContent();

    int getPoint();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();
}
