package site.carborn.entity.company;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.carborn.entity.account.Account;

@Entity
@Table(name = "MWS_INSURANCE_COM")
@Getter
@Setter
public class InsuranceCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @Column(length = 200)
    private String name;
}
