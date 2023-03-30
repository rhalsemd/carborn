package site.carborn.service.common;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.carborn.entity.account.Account;
import site.carborn.entity.common.SmsAuth;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.common.SmsAuthRepository;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final SmsAuthRepository smsAuthRepository;

    public String findId(Account account) {
        String name = account.getName();
        String phoneNo = account.getPhoneNo();

        Account save = accountRepository.findByPhoneNoAndName(phoneNo, name).orElseThrow(() ->
                new NullPointerException("입력한 정보에 해당하는 사용자가 존재하지 않습니다")
        );

        SmsAuth smsAuth = smsAuthRepository.checkSmsAuth(phoneNo);
        if (smsAuth == null || smsAuth.isStatus() == false) {
            throw new RuntimeException("SMS 인증을 완료하지 않았습니다");
        }

        return save.getId();
    }
}
