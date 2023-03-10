package site.carborn.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "MWS_INSPECTOR")
@Getter
@Setter
public class Inspector {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @Column(length = 200)
    private String name;

    @Column(length = 200)
    private String address;

    private double lat;

    private double lng;
}
