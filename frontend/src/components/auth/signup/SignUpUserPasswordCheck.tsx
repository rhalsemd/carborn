import React, { useState } from 'react';
import { StyleSignUpInputDiv } from "../../../routes/Signup";
import { SignupFormData } from './SignUpButton';

export type SignUpUserPasswordCheckProps = {
  signupUserFormData:SignupFormData
}

const SignUpUserPasswordCheck = ({signupUserFormData}:SignUpUserPasswordCheckProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [secondPassword, setSecondPassword] = useState<string>("");
  // 비밀번호 중복 체크 로직
  const handleUserPasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.target.value)
    if (signupUserFormData.password === e.target.value) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  };

  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  return (
    <StyleSignUpInputDiv>
      <label htmlFor="userid">비밀번호 확인</label>{isValid ? <span>비밀번호가 일치합니다.</span> : null}
      <br />
      <input
        type="password"
        id="userid"
        placeholder="아이디를 입력해주세요(ex. ssafy123)"
        autoComplete="off"
        required
        value={secondPassword}
        onChange={(e) => handleUserPasswordCheck(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
    </StyleSignUpInputDiv>
  )
}

export default SignUpUserPasswordCheck;