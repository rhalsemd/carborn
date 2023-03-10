package site.carborn.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_SELF_REPAIR")
@Getter
@Setter
public class SelfRepair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 200)
    private String title;

    private String content;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}