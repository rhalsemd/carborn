package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface CarSaleBookGetListMapping {

    int getId();

    int getBookStatus();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();
}
