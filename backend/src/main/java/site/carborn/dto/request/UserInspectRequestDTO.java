package site.carborn.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class UserInspectRequestDTO {
    private int id;
    private int carId;
    private int inspectorId;
    private String accountId;
    private String content;
    private LocalDate bookDt;
}
