package site.carborn.service.common;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.RequestEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import site.carborn.config.auth.dto.TokenDTO;
import site.carborn.config.auth.jwt.TokenProvider;
import site.carborn.entity.account.Account;
import site.carborn.entity.account.AccountLoginLog;
import site.carborn.repository.account.AccountLoginLogRepository;
import site.carborn.repository.account.AccountRepository;
import site.carborn.util.common.HTTPUtils;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final AccountRepository accountRepository;
    private final AccountLoginLogRepository loginLogRepository;
    private final RedisTemplate redisTemplate;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;

    public TokenDTO login(Account account, HttpServletRequest request) {
        if (account.getPwd() == null || account.getPwd().isBlank()) {
            throw new NullPointerException("비밀번호를 입력해주세요");
        }

        Account data = accountRepository.findById(account.getId());
        if (data == null || passwordEncoder.matches(account.getPwd(), data.getPwd()) == false) {
            throw new NullPointerException("아이디 혹은 비밀번호가 틀렸습니다");
        }

        // 사용자 인증 과정
        account.setAuth(data.getAuth());
        UsernamePasswordAuthenticationToken authToken = account.toAuthentication();
        Authentication auth = managerBuilder.getObject().authenticate(authToken);

        // 로그인 로그 기록
        insertLoginLog(account, request);

        // 토큰 반환
        return tokenProvider.generateTokenDto(auth);
    }

    public boolean logout(RequestEntity<?> httpMessage) {
        String accessToken = httpMessage.getHeaders().get("Authorization").get(0).substring(7);
        Long expiration = tokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

        return true;
    }

    private void insertLoginLog(Account account, HttpServletRequest request) {
        String agent = request.getHeader("User-Agent");
        String os = HTTPUtils.getClientOS(agent);                             // 클라이언트 운영체제
        String browser = HTTPUtils.getClientBrowser(agent);                   // 클라이언트 브라우저
        String ipAddr = (String) request.getHeader("X-Forwarded-For");  // 클라이언트 IP
        if (ipAddr == null == ipAddr.isBlank()) {
            ipAddr = "*0.0.0.0";
        }

        AccountLoginLog loginLog = new AccountLoginLog();
        loginLog.setAccount(account);
        loginLog.setBrowser(browser);
        loginLog.setIpAddr(ipAddr);
        loginLog.setOs(os);
        loginLog.setRegDt(LocalDateTime.now());

        loginLogRepository.save(loginLog);
    }
}
