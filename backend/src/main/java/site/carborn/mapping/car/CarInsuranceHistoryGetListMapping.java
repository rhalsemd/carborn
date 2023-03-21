package site.carborn.mapping.car;

import java.time.LocalDateTime;

public interface CarInsuranceHistoryGetListMapping {

    String getId();

    String getCarVin();

    String getCategory();

    LocalDateTime getInsuranceDt();

    LocalDateTime getRegDt();
}
