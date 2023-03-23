package site.carborn.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.car.CarInsuranceHistory;

@Getter
@Setter
@NoArgsConstructor
public class CarInsuranceHistoryRequestDTO extends CarInsuranceHistory {
    private String metaDataUri;
}
