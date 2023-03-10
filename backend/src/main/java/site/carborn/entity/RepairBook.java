package site.carborn.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_REPAIR_BOOK")
@Getter
@Setter
public class RepairBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REPAIR_SHOP_ID")
    private RepairShop repairShop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    private String content;

    private int bookStatus;

    private LocalDateTime bookDt;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
