package site.carborn.mapping.user;

import jakarta.persistence.Column;

import java.time.LocalDateTime;

public interface UserInsuranceListMapping {
    int getId();

    //기업정보
    String getInsuranceCompanyAccountId();

    //차정보
    String getCarAccountId();
    String getCarMaker();
    String getCarModelNm();
    String getCarModelYear();
    String getCarRegNm();

    //보험수리관련
    String getCategory();
    String getContent();
    String getInsuranceImgNm();
    LocalDateTime getInsuranceDt();
    LocalDateTime getRegDt();

}
