package site.carborn.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CAR")
@Getter
@Setter
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @Column(length = 50)
    private String maker;

    @Column(length = 200)
    private String modelNm;

    @Column(length = 50)
    private String modelYear;

    @Column(length = 50)
    private String regNm;

    @Column(length = 200)
    private String vin;

    private int mileage;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
