import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import LoginID from "../../components/auth/login/LoginID";
import LoginPassword from "../../components/auth/login/LoginPassword";
import React, { useState, useEffect, ButtonHTMLAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../components/Nav";
import { loginAction } from "../../modules/takeLoginLogoutModule";
import { userInfoDeleteReset } from "../../modules/userInfoDeleteModule";
import { companyInfoDeleteReset } from "../../modules/companyInfoDeleteModule";
import { companyModifyPasswordReset, userModifyPasswordReset } from "../../modules/modifyPasswordModule";
import { IsCanSignUpReset } from "../../modules/signUpModule";

export const StyleLink = styled(Link)`
  color: #d23131;
  font-size: 0.75rem;
  text-decoration: none;
  margin: 0 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;


export const StyleLoginSignUpDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;

export const StyleLoginSignUpBoxDiv = styled.div`
  width: 35%;
  margin: 5rem 0;
  padding: 0rem, 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: #fdfdfde9;
`;

export const StyleLoginSignUpTitle = styled.div`
  width: 100%;
  height: 20%;
  border-bottom: 1px solid red;
  text-align: center;

  p {
    font-size: 1.5rem;
    font-weight: 900;
  }
`;

export const StyleLoginSignUpBtn = styled.button<StyleLoginSignUpBtnProps>`
  width: 50%;
  height: 2.5rem;
  margin-left: 1%;
  margin-bottom: 1rem;
  color: white;
  border: 5px solid transparent;
  border-radius: 5px;
  font-weight: 900;
  font-size: 1rem;

  &:active {
    background-color: white;
    color: black;
    border: 5px solid #d23131;
  }

  &:hover {
    opacity: 0.8;
  }

  background-color: ${(props) => props.backgroundColor};
  border: none;
  cursor: pointer;
`;

export const StyleLoginAnotherLink = styled.div`
  text-decoration: none;
`;

// 로그인 인풋 데이터 타입
export interface loginInputType {
  loginid: string;
  loginpassword: string;
  captcha?: string;
  success?: boolean;
}

// CSS 타입
export interface StyleLoginSignUpBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

// 로그인 props를 정의하는 인터페이스 타입
export interface LoginInputProps {
  setLoginInput: React.Dispatch<React.SetStateAction<loginInputType>>;
  loginInput: loginInputType;
}

const LoginPages = () => {
  // 액션 실행
  const dispatch = useDispatch();
  // 페이지 이동
  const navigate = useNavigate();
  // 리듀서 가져오기
  const { accountType } = useSelector((state: any) => state.LoginOutReducer);
  const { success } = useSelector((state: any) => state.LoginOutReducer);

  // 로그인 데이터 컨테이너
  const initialState = {
    loginid: "",
    loginpassword: "",
  };

  // 로그인 인풋, 리캡챠 적용여부 useState
  const [loginInput, setLoginInput] = useState<loginInputType>(initialState);
  const [captchaValue, setCaptchaValue] = useState<boolean>(false);
  const [isAccountType, setIsAccountType] = useState<string>("");
  const [isToken, setIsToken] = useState<boolean>(false);

  // 로그인 하기(최종)
  const handleLogin = () => {
    dispatch(loginAction(loginInput));
  };

  useEffect(() => {
    setIsAccountType(accountType);
    if (loginInput.loginid && loginInput.loginpassword) {
      setCaptchaValue(true) 
    } else {
      setCaptchaValue(false)
    }

  }, [accountType, loginInput.loginid, loginInput.loginpassword]);

  useEffect(() => {
    if (!success) {
      navigate("/login");
      return;
    }

    switch (isAccountType) {
      case "0":
        navigate("/");
        break;
      case "1":
        navigate("/garage");
        break;
      case "2":
        navigate("/inspector");
        break;
      case "3":
        navigate("/insurance");
        break;
      default:
        navigate("/login");
        break;
    }
  }, [success, isAccountType, navigate]);

  useEffect(() => {
    dispatch(userInfoDeleteReset())
    dispatch(companyInfoDeleteReset())
    dispatch(userModifyPasswordReset())
    dispatch(companyModifyPasswordReset())
    dispatch(IsCanSignUpReset())
  }, [dispatch])

  return (
    <div>
      <Nav isToken={isToken} setIsToken={setIsToken} />
      <StyleLoginSignUpDiv>
        <StyleLoginSignUpBoxDiv>
          <StyleLoginSignUpTitle>
            <h2>로그인</h2>
          </StyleLoginSignUpTitle>
          <LoginID setLoginInput={setLoginInput} loginInput={loginInput} />
          <LoginPassword
            setLoginInput={setLoginInput}
            loginInput={loginInput}
          />
          <StyleLoginSignUpBtn
            backgroundColor={captchaValue ? "#d23131" : "grey"}
            disabled={!captchaValue}
            onClick={handleLogin}
          >
            로그인 하기
          </StyleLoginSignUpBtn>
          <StyleLoginAnotherLink>
            <StyleLink to="/getagreement">회원가입</StyleLink> /
            <StyleLink to="/searchid"> 아이디 찾기</StyleLink> /
            <StyleLink to="/passwordresetcheck"> 비밀번호 재설정</StyleLink>
          </StyleLoginAnotherLink>
        </StyleLoginSignUpBoxDiv>
      </StyleLoginSignUpDiv>
    </div>
  );
};

export default LoginPages;