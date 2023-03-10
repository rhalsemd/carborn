package site.carborn.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CAR_SALE")
@Getter
@Setter
public class CarSale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CAR_ID")
    private Car car;

    private String content;

    private int price;

    private int saleStatus;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
