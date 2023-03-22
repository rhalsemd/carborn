package site.carborn.mapping.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface repairListMapping{
    int getId();

    int getCarId();

    int getRepairShopId();

    String getAccountId();

    String getContent();

    int getBookStatus();

    LocalDate getBookDt();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();
    }
