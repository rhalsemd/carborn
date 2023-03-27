package site.carborn.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.account.Account;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class AccountRequestDTO extends Account {
    private LocalDate birth;
    private String BRN;
}
