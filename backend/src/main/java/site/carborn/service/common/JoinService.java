package site.carborn.service.common;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import site.carborn.dto.request.AccountRequestDTO;
import site.carborn.entity.account.Account;
import site.carborn.entity.account.Company;
import site.carborn.entity.account.User;
import site.carborn.entity.common.SmsAuth;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.common.SmsAuthRepository;
import site.carborn.util.common.AuthUtils;

import java.util.regex.Pattern;

@Slf4j
@Service
@Transactional
public class JoinService {
    @Autowired AccountRepository accountRepository;
    @Autowired SmsAuthRepository smsAuthRepository;
    @Autowired PasswordEncoder passwordEncoder;

    public void join(AccountRequestDTO dto) {
        Account account = Account.copy(dto);
        String id = account.getId();
        String pwd = account.getPwd();
        String phoneNo = account.getPhoneNo();

        checkAccountIdFormat(id);
        checkAccountPwdFormat(pwd);

        // 비밀번호 암호화
        account.setPwd(passwordEncoder.encode(pwd));

        Account idCheck = accountRepository.findById(id);
        if (idCheck != null) {
            throw new RuntimeException("중복된 아이디가 존재합니다");
        }
        Account phoneNoCheck = accountRepository.findByPhoneNo(phoneNo);
        if (phoneNoCheck != null) {
            throw new RuntimeException("중복된 휴대전화 번호가 존재합니다");
        }

        SmsAuth smsAuth = smsAuthRepository.checkSmsAuth(phoneNo);
        if (smsAuth == null || smsAuth.isStatus() == false) {
            throw new RuntimeException("SMS 인증을 완료하지 않았습니다");
        }

        switch(account.getAuth()) {
            case AuthUtils.AUTH_USER:
                User user = new User();
                user.setAccount(account);
                user.setBirth(dto.getBirth());

                joinUser(account, user);
                break;

            case AuthUtils.AUTH_REPAIR_SHOP:
            case AuthUtils.AUTH_INSPECTOR:
            case AuthUtils.AUTH_INSURANCE:
                Company company = new Company();
                company.setAccount(account);
                company.setBrn(dto.getBRN());

                joinCompany(account, company, dto);
                break;
        }
    }

    private void joinUser(Account account, User user) {



    }

    private void joinCompany(Account account, Company company, AccountRequestDTO dto) {




    }

    private void checkAccountIdFormat(String id) {
        String pattern = "^[a-z0-9]*$";
        if (id.length() < 8 || id.length() > 20) {
            throw new RuntimeException("아이디는 8~20자로 설정해야합니다");
        }

        if (Pattern.matches(pattern, id) == false) {
            throw new RuntimeException("아이디는 영문 소문자, 숫자만 가능합니다");
        }
    }

    private void checkAccountPwdFormat(String pwd) {
        String pattern = "^(?=^.{8,20}$)(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]*$";
        if (pwd.length() < 8 || pwd.length() > 20) {
            throw new RuntimeException("비밀번호는 8~20자로 설정해야합니다");
        }

        if (Pattern.matches(pattern, pwd) == false) {
            throw new RuntimeException("비밀번호 형식이 올바르지 않습니다");
        }
    }
}
