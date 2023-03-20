package site.carborn.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class UserRepairBookRequestDTO {
    private int carId;
    private int repairShopId;
    private String account;
    private String content;
//    private LocalDate bookDt;

}
