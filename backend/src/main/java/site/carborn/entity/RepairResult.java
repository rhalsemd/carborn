package site.carborn.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_REPAIR_RESULT")
@Getter
@Setter
public class RepairResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REPAIR_BOOK_ID")
    private RepairBook repairBook;

    private String content;

    private int mileage;

    @Column(length = 200)
    private String beforeImgNm;

    @Column(length = 200)
    private String afterImgNm;

    @Column(length = 200)
    private String receiptImg;

    private LocalDateTime repairDt;

    private LocalDateTime regDt;
}
