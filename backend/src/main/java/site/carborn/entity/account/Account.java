package site.carborn.entity.account;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "MWS_ACCOUNT")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "pwd")
public class Account {
    @Id
    @Column(length = 50)
    private String id;

    @Column(length = 50)
    private String pwd;

    @Column(length = 50)
    private String name;

    @Column(length = 50)
    private String phoneNo;

    private int auth;
}
