package site.carborn.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.entity.account.Account;
import site.carborn.repository.account.AccountRepository;
import site.carborn.service.HelloService;
import site.carborn.util.network.NormalResponse;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
public class HelloController {
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AccountRepository accountRepository;

    @GetMapping("/api/hello")
    public String test() {return "Hello, world!";}

    @Autowired
    HelloService helloService;

    @GetMapping("/api/hello/{accountId}")
    public ResponseEntity<?> test(@PathVariable String accountId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, helloService.hello(accountId));
    }

    @GetMapping("/api/test/{password}")
    public ResponseEntity<?> encodePwd(@PathVariable String password) {
        String encodedPwd = passwordEncoder.encode(password);

        log.debug("비밀번호: {}", password);
        log.debug("암호화: {}", encodedPwd);

        return NormalResponse.toResponseEntity(HttpStatus.OK, encodedPwd);
    }

    @GetMapping("/api/test/all-password")
    public ResponseEntity<?> allPassword() {
        String pwd = "ssafy123!";
        List<Account> accountList = accountRepository.findAll();

        int index = 1;
        for (Account account: accountList) {
            account.setPwd(passwordEncoder.encode(pwd));
            accountRepository.save(account);

            log.debug("{}/{} : {} 변경완료", index, accountList.size(), account.getId());
            index++;
        }

        return NormalResponse.toResponseEntity(HttpStatus.OK, true);
    }
}
