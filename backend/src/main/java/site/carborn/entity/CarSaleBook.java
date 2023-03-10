package site.carborn.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CAR_SALE_BOOK")
@Getter
@Setter
public class CarSaleBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CAR_SALE_ID")
    private CarSale carSale;

    private int bookStatus;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
