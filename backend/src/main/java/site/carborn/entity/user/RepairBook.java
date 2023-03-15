package site.carborn.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.company.RepairShop;
import site.carborn.entity.account.Account;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_REPAIR_BOOK")
@Getter
@Setter
@NoArgsConstructor
public class RepairBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "REPAIR_SHOP_ID")
//    @JsonIgnoreProperties({"account", "address", "lat", "lng"}) // 정제할 속성 지정
    private RepairShop repairShop;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ACCOUNT_ID")
//    @JsonIgnoreProperties({"pwd", "walletHash", "auth"}) // 정제할 속성 지정
    private Account account;

    private String content;

    private int bookStatus;

    private LocalDateTime bookDt;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

//    @JsonIgnore
    private boolean status;
}
