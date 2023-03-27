package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface CarSaleGetListMapping {

    int getId();

    String getCarMaker();

    String getCarModelYear();

    int getCarMileage();

    int getPrice();

    LocalDateTime getRegDt();


}
