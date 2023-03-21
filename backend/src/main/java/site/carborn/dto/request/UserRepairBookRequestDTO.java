package site.carborn.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserRepairBookRequestDTO {
    private int carId;
    private int repairShopId;
    private String account;
    private String content;
    private LocalDateTime bookDt;

}
