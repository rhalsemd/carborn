package site.carborn.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TradeRequestDTO {

    private String buyId;

    private String SellId;

    private int carId;

    private int price;
}
