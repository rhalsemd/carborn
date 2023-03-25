import { useState, useEffect, ButtonHTMLAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewPassword from "../../components/auth/newpassword/NewPassword";
import NewPasswordCheck from "../../components/auth/newpassword/NewPasswordCheck";
import Nav from "../../components/Nav";
import { StyleLoginSignUpBoxDiv } from "./LoginPage";
import { StyleLoginSignUpDiv } from "./PasswordResetCheck";
import { StyleLoginSignUpTitle } from "./SearchID";
import { StyleBtn } from "./PasswordComplete";
import { passwordResetCheckReset } from "./../../modules/PasswordCheckModule";
import { newPasswordAction, newPasswordReset } from "./../../modules/PasswordResetModule";
import styled from "@emotion/styled";

// 타입 설정
export type SearchInputPasswordCheckObj = {
  newpassword: string;
  newpasswordcheck: boolean | null;
};

// CSS 타입
export interface StyleNewPasswordResetBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

export const StyleNewPasswordResetBtn = styled.button<StyleNewPasswordResetBtnProps>`
    width: 15rem;
    text-align: center;
    font-size: 1.2rem;
    color: white;
    background-color: ${(props) => props.backgroundColor};
    border: none;
    margin: 0.5rem 0;
    cursor: pointer;
`;

const NewPasswordReset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNewPass = useSelector(
    (state:any) => state.newPasswordReducer.newpasswordcheck );
  const [inputObj, setInputObj] = useState<SearchInputPasswordCheckObj>({
    newpassword: "",
    newpasswordcheck: false,
  });
  const [newSecondPassword, setNewSecondPassword] = useState<string>("");
  const [isNewPassword, setIsNewPassword] = useState<boolean>(false);
  const [newpassword, setNewpassword] = useState("");

  console.log(inputObj);
  console.log(isNewPass)

  const handlePasswordReset = () => {
    dispatch(newPasswordAction(inputObj));
  };

  useEffect(() => {
    if(isNewPass){
      navigate('/passwordresetcheck/passwordreset/passwordcomplete')
    }
    dispatch(passwordResetCheckReset());
  }, [dispatch, isNewPass, navigate]);

  // useEffect(() => {
  //   if (selector) {
  //     setIsValid(selector);
  //   }
  // }, [selector, setIsValid]);

  // useEffect(() => {
  //   navigate("/passwordresetcheck/passwordreset/passwordcomplete");
  // }, [navigate]);

  return (
    <div>
      <Nav />
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
          <StyleNewPasswordResetBtn
            backgroundColor={inputObj.newpasswordcheck ? "#d23131" : "grey"}
            disabled={!inputObj.newpasswordcheck}
            onClick={handlePasswordReset}
          >
            비밀번호 재설정
          </StyleNewPasswordResetBtn>
        </StyleLoginSignUpBoxDiv>
      </StyleLoginSignUpDiv>
    </div>
  );
};

export default NewPasswordReset;
