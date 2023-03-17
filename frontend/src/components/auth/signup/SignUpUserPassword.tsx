import React from 'react';
// import { useSelector } from 'react-redux';
import { StyleSignUpInputDiv } from "../../../routes/Signup";
import { SignupFormData } from './SignUpButton';

export interface SignUpPasswordProps {
  signupUserFormData: SignupFormData;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
}

const SignUpUserPassword = ({setSignupUserFormData, signupUserFormData}:SignUpPasswordProps) => {
  // dispatch, selector
  // const result = useSelector((state) => state) 
  // console.log(result)

  // 입력되는거 formdata에 넘겨주기
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 타이핑하는순간 비밀번호중복체크 초기화됨
    setSignupUserFormData({
      ...signupUserFormData,
      password: e.target.value,
    });
  };

  // 비밀번호 유효성 : 영문자 소문자랑 숫자랑 특수문자(전부가능)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const regex = /^[a-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
      if (regex.test(e.currentTarget.value)) {
        alert("입력한 비밀번호가 유효합니다.");
      } else {
        alert("입력한 비밀번호가 영소문자 및 숫자, 특수문자가 아닙니다.");
        setSignupUserFormData({
          ...signupUserFormData,
          password: "",
        });
      }
    }
  };

  return (
    <StyleSignUpInputDiv>
      <label htmlFor="userpassword">비밀번호</label>
      <br />
      <input
        type="password"
        id="userpassword"
        placeholder="비밀번호를 입력해주세요"
        autoComplete="off"
        required
        value={signupUserFormData.password}
        onChange={(e) => handlePassword(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
    </StyleSignUpInputDiv>
  )
}

export default SignUpUserPassword;