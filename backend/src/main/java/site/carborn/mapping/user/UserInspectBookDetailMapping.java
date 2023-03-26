package site.carborn.mapping.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface UserInspectBookDetailMapping {
    int getId();
    int getCarId();
    int getInspectorId();
    String getAccountId();
    String getContent();
    int getBookStatus();
    LocalDate getBookDt();
    LocalDateTime getRegDt();
    LocalDateTime getUptDt();
}
