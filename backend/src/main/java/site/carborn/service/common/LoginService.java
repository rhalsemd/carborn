package site.carborn.service.common;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import site.carborn.config.auth.dto.TokenDTO;
import site.carborn.config.auth.jwt.TokenProvider;
import site.carborn.entity.account.Account;
import site.carborn.entity.account.AccountLoginLog;
import site.carborn.repository.account.AccountLoginLogRepository;
import site.carborn.repository.account.AccountRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.HTTPUtils;

import java.time.LocalDateTime;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {
    @Autowired
    AuthenticationManagerBuilder managerBuilder;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    AccountLoginLogRepository loginLogRepository;
    @Autowired
    TokenProvider tokenProvider;

    public TokenDTO login(Account account, HttpServletRequest request) {
        // 사용자 인증 과정
        UsernamePasswordAuthenticationToken authToken = account.toAuthentication();
        Authentication auth = managerBuilder.getObject().authenticate(authToken);

        // 사용자 검증
        Account data = accountRepository.findById(account.getId());
        if (data == null) {
            throw new NullPointerException("아이디 혹은 비밀번호가 틀렸습니다");
        }

        // 로그인 로그 기록
        insertLoginLog(account, request);

        // 토큰 반환
        return tokenProvider.generateTokenDto(auth);
    }

    private void insertLoginLog(Account account, HttpServletRequest request) {

        String agent = request.getHeader("User-Agent");
        String os = HTTPUtils.getClientOS(agent);                             // 클라이언트 운영체제
        String browser = HTTPUtils.getClientBrowser(agent);                   // 클라이언트 브라우저
        String ipAddr = (String) request.getHeader("X-Forwarded-For");  // 클라이언트 IP

        AccountLoginLog loginLog = new AccountLoginLog();
        loginLog.setAccount(account);
        loginLog.setOs(os);
        loginLog.setBrowser(browser);
        loginLog.setIpAddr(ipAddr);
        loginLog.setRegDt(LocalDateTime.now());

        loginLogRepository.save(loginLog);
    }

    public String findAccountId(Account account) {
        Account data = accountRepository.findByPhoneNoAndName(account.getPhoneNo(), account.getName()).get();
        if (data == null) {
            throw new NullPointerException("입력하신 계정 정보가 없습니다");
        }

        // 아이디 전송
//        sendMessage(data.getId());

        return BoardUtils.BOARD_CRUD_SUCCESS;
    }

    public Account findAccountPwd(Account account) {
        Account data = accountRepository.findByIdAndPhoneNoAndName(account.getId(), account.getPhoneNo(), account.getName()).get();
        if (data == null) {
            throw new NullPointerException("입력하신 계정 정보가 없습니다");
        }

        // 인증번호 전송
//        sendMessage(randomNum);

        return data;
    }
}
