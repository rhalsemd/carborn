import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import NewPassword from '../components/auth/newpassword/NewPassword';
import NewPasswordCheck from '../components/auth/newpassword/NewPasswordCheck';
import { passwordReset } from '../modules/passwordResetModule';
import { StyleLoginSignUpBoxDiv, StyleLoginSignUpBtn, StyleLoginSignUpDiv, StyleLoginSignUpTitle } from "./Login"

// 타입 설정
export type SearchInputPasswordCheckObj = {
  newpassword: string,
  newpasswordcheck: boolean | null
};

const PasswordReset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state:{newpasswordcheck:boolean}) => state.newpasswordcheck)
  console.log(selector)
  const [inputObj, setInputObj] = useState<SearchInputPasswordCheckObj>({
    newpassword: "",
    newpasswordcheck: null
  });
  const [newSecondPassword, setNewSecondPassword] = useState<string>('');
  const [isNewPassword, setIsNewPassword] = useState<null | boolean>(null);
  const [newpassword, setNewpassword] = useState("");
  const [isValid, setIsValid] = useState<null | boolean>(null);

  const handlePasswordReset = () => {
    dispatch(passwordReset(inputObj))
  }

  useEffect(() => {
    if (selector) {
      setIsValid(selector)
    }
  }, [selector, setIsValid])

  useEffect(() => {
    navigate('/passwordresetcheck/passwordreset/passwordcomplete')
  }, [navigate])

  return (
    <StyleLoginSignUpDiv>
      <StyleLoginSignUpBoxDiv>
        <StyleLoginSignUpTitle>
          <h2>비밀번호 재설정</h2>
        </StyleLoginSignUpTitle>
        <NewPassword 
          setInputObj={setInputObj} 
          inputObj={inputObj} 
          newSecondPassword={newSecondPassword}
          setIsNewPassword={setIsNewPassword}
          setNewpassword={setNewpassword}
          newpassword={newpassword}
          />
        <NewPasswordCheck 
          setInputObj={setInputObj}
          inputObj={inputObj}
          setNewSecondPassword={setNewSecondPassword}
          newSecondPassword={newSecondPassword}
          setIsNewPassword={setIsNewPassword}
          isNewPassword={isNewPassword}
          newpassword={newpassword}
        />
        <StyleLoginSignUpBtn onClick={handlePasswordReset}>
          비밀번호 재설정
        </StyleLoginSignUpBtn>
      </StyleLoginSignUpBoxDiv>
    </StyleLoginSignUpDiv>
  )
}

export default PasswordReset