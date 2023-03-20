import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { SearchInputPasswordCheckObj } from "../../../routes/PasswordReset";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type NewPasswordCheckProps = {
  setInputObj: React.Dispatch<React.SetStateAction<SearchInputPasswordCheckObj>>;
  inputObj: SearchInputPasswordCheckObj;
  setNewSecondPassword: React.Dispatch<React.SetStateAction<string>>;
  newSecondPassword: string;
  setIsNewPassword: React.Dispatch<React.SetStateAction<null | boolean>>;
  isNewPassword: null | boolean
  newpassword: string
}

const NewPasswordCheck = ({ 
  setInputObj, 
  inputObj, 
  setNewSecondPassword, 
  newSecondPassword, 
  setIsNewPassword, 
  isNewPassword,
  newpassword
}:NewPasswordCheckProps) => {

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value
    setNewSecondPassword(value)
    if (newpassword === value) {
      setNewSecondPassword(value)
      setIsNewPassword(true)
      setInputObj({
        ...inputObj,
        newpasswordcheck: true
      })
    } else {
      setIsNewPassword(false)
      setInputObj({
        ...inputObj,
        newpasswordcheck: false
      })
    }
  };

  useEffect(() => {
    if (newSecondPassword === newpassword && newSecondPassword) {
      setIsNewPassword(true)
    } else {
      setIsNewPassword(false)
    }
  }, [newSecondPassword, newpassword, setIsNewPassword])

  return (
    <StyleLoginInputDiv>
      <label htmlFor="newpasswordcheck">새로운 비밀번호 체크</label>
      {isNewPassword ? ( <span>비밀번호가 일치합니다.</span> ) : null}
      <input
        type="password"
        id="newpasswordcheck"
        name="newpasswordcheck"
        autoComplete="off"
        value={newSecondPassword}
        placeholder="변경할 비밀번호를 다시 입력해주세요"
        onChange={(e) => handlePasswordCheck(e)}
      />
    </StyleLoginInputDiv>
  );
};

export default NewPasswordCheck;
