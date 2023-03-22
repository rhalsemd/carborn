package site.carborn.mapping.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface RepairBookGetListMapping {

    int getId();

    String getCarModelNm();

    String getCarRegNm();

    String getCarVin();

    String getAccountId();

    String getAccountName();

    int getBookStatus();

    LocalDate getBookDt();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();
}
