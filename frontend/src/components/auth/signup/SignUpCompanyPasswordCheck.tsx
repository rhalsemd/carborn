import React, { useState } from 'react';
import { StyleSignUpInputDiv } from "../../../routes/Signup";
import { SignupFormData } from "./SignUpButton";

export type SignUpCompanyPasswordCheckProps = {
  signupCompanyFormData:SignupFormData
}

const SignUpCompanyPasswordCheck = ({signupCompanyFormData}:SignUpCompanyPasswordCheckProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [secondPassword, setSecondPassword] = useState<string>("");
  // 비밀번호 중복 체크 로직
  const handleCompanyPasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.target.value)
    if (signupCompanyFormData.password === e.target.value) {
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
        onChange={(e) => handleCompanyPasswordCheck(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
    </StyleSignUpInputDiv>
  )
}

export default SignUpCompanyPasswordCheck;