import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PasswordResetVerify from "../../components/auth/passwordreset/PasswordResetVerify";
import PasswordResetID from "../../components/auth/passwordreset/PasswordResetID";
import { passwordResetCheck } from "../../modules/PasswordCheckModule";
import Nav from "./../../components/Nav";

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
export type PasswordResetInputObj = {
  userid: string;
  phonenumber: string;
  isVerify: boolean;
};

const PasswordResetCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isverify = useSelector((state: any) => state.passwordResetCheckReducer.isVerify);
  const [inputObj, setinputObj] = useState<PasswordResetInputObj>({
    userid: "",
    phonenumber: "",
    isVerify: false,
  });

  const handlePasswordReset = () => {
    dispatch(passwordResetCheck(inputObj));
  };

  useEffect(() => {
    if (isverify) {
      navigate("/passwordresetcheck/passwordreset");
    }
  }, [navigate, isverify]);

  return (
    <div>
      <Nav />
      <StyleLoginSignUpDiv>
        <StyleLoginSignUpBoxDiv>
          <StyleLoginSignUpTitle>
            <h2>비밀번호 재설정</h2>
          </StyleLoginSignUpTitle>
          <PasswordResetID setinputObj={setinputObj} inputObj={inputObj} />
          <PasswordResetVerify setinputObj={setinputObj} inputObj={inputObj} />
          <StyleLoginSignUpBtn onClick={handlePasswordReset}>
            비밀번호 재설정
          </StyleLoginSignUpBtn>
        </StyleLoginSignUpBoxDiv>
      </StyleLoginSignUpDiv>
    </div>
  );
};

export default PasswordResetCheck;
