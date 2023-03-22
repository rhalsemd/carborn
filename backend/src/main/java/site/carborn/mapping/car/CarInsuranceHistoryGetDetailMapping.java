package site.carborn.mapping.car;

import java.time.LocalDateTime;

public interface CarInsuranceHistoryGetDetailMapping {

    String getId();

    String getCarVin();

    String getCategory();

    LocalDateTime getInsuranceDt();

    LocalDateTime getRegDt();
}
