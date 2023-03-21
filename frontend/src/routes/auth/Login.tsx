import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import LoginID from "../../components/auth/login/LoginID";
import LoginPassword from "../../components/auth/login/LoginPassword";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginTry, User } from "../../modules/loginModule";
import { useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import Nav from './../../components/Nav';

export const StyleLoginSignUpDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyleLoginSignUpBoxDiv = styled.div`
  width: 25%;
  padding: 0rem, 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: #d5cfcf2a;
`;

export const StyleLoginSignUpTitle = styled.div`
  width: 100%;
  height: 20%;
  border-bottom: 1px solid red;
  text-align: center;
`;

export const StyleLoginSignUpBtn = styled.button`
  width: 15rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  background-color: #d23131;
  border: none;
  margin: 0.5rem 0;
`;

export const StyleLoginAnotherLink = styled.div`
  font-size: 0.7rem;
  text-decoration: none;
`;

// 타입 설정
export type InputObj = {
  userid: string;
  userpassword: string;
  success?: boolean;
};

export type LoginProps = {
  setinputObj: React.Dispatch<React.SetStateAction<InputObj>>;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Obj = useSelector((state: any) => state);

  const [inputObj, setinputObj] = useState<InputObj>({
    userid: "",
    userpassword: "",
    success: false,
  });
  const token = sessionStorage.getItem("login-token");

  const [captchaValue, setCaptchaValue] = useState<string>("");

  const handleLogin = () => {
    const user: User = {
      userid: inputObj.userid,
      userpassword: inputObj.userpassword,
      captcha: captchaValue,
    };

    // 리캡쳐가 체크가 되었을때, 액션 실행
    if (captchaValue) {
      dispatch(loginTry(user));
    } else {
      console.log("Captcha value is not set");
    }
  };

  // 리캡챠 콜백 함수
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value ?? "");
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div>
      <Nav />
      <StyleLoginSignUpDiv>
        <StyleLoginSignUpBoxDiv>
          <StyleLoginSignUpTitle>
            <h2>로그인</h2>
          </StyleLoginSignUpTitle>
          <LoginID setinputObj={setinputObj} />
          <LoginPassword setinputObj={setinputObj} />
          <ReCAPTCHA
            sitekey="6LdijBMlAAAAACu0OtiHgCtKlGE58nkcRFXPxSLk"
            onChange={handleCaptchaChange}
            style={{ marginBottom: "1rem" }}
          />
          <StyleLoginSignUpBtn onClick={handleLogin}>
            로그인 하기
          </StyleLoginSignUpBtn>
          <StyleLoginAnotherLink>
            <Link to="/termsofuse">회원가입</Link> /
            <Link to="/searchid"> 아이디 찾기</Link> /
            <Link to="/passwordresetcheck"> 비밀번호 재설정</Link>
          </StyleLoginAnotherLink>
        </StyleLoginSignUpBoxDiv>
      </StyleLoginSignUpDiv>
    </div>
  );
};

export default Login;
