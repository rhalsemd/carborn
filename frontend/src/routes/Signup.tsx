import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import SignUpButton, { SignupFormData } from "../components/auth/signup/SignUpButton";
import SignUpCompanyId from "../components/auth/signup/SignUpCompanyId";
import SignUpCompanyName from "../components/auth/signup/SignUpCompanyName";
import SignUpCompanyTypeButton from "../components/auth/signup/SignUpCompanyTypeButton";
import SignUpUserId from "../components/auth/signup/SignUpUserId";
import SignUpUserName from "../components/auth/signup/SignUpUserName";
import {
  StyleLoginSignUpBoxDiv,
  StyleLoginSignUpBtn,
  StyleLoginSignUpDiv,
  StyleLoginSignUpTitle,
} from "./Login";

// CSS
export const StyleSignUpUserNameDiv = styled.div`
  width: 100%;
  padding-left: 2rem;
`;
const Signup = () => {
  // 회원구분 세팅 및 전송 데이터 형태 구축
  const [selectedButton, setSelectedButton] = useState("user");
  // 회원가입 초기값
  const initialSignupFormData = {
    usertype: "0",
    name: "",
    id: "",
    password: "",
    passwordcheck: false,
    birth: "",
    address: "",
    phonenumber: "",
    FileList: [],
  };

  const [signupUserFormData, setSignupUserFormData] =
    useState<SignupFormData>(initialSignupFormData);
  const [signupCompanyFormData, setSignupCompanyFormData] =
    useState<SignupFormData>(initialSignupFormData);

  // 이거 나중에 통신할때 급하게 테스트 필요할수도 있으니까 놔둠
  useEffect(() => {
    if (selectedButton === "user") {
      // console.log(signupUserFormData)
    } else {
      // console.log(signupCompanyFormData)
    }
  }, [selectedButton]);

  return (
    <StyleLoginSignUpDiv>
      <StyleLoginSignUpBoxDiv>
        <StyleLoginSignUpTitle>
          <h2>회원가입</h2>
        </StyleLoginSignUpTitle>
        <SignUpButton
          setSelectedButton={setSelectedButton}
          selectedButton={selectedButton}
          setSignupUserFormData={setSignupUserFormData}
          setSignupCompanyFormData={setSignupCompanyFormData}
          initialSignupFormData={initialSignupFormData}
        />
        <form>
          {selectedButton === "user" ? (
            <div>
              <SignUpUserName
                setSignupUserFormData={setSignupUserFormData}
                signupUserFormData={signupUserFormData}
              />
              <SignUpUserId
                setSignupUserFormData={setSignupUserFormData}
                signupUserFormData={signupUserFormData}
              />
            </div>
          ) : (
            <div>
              <SignUpCompanyTypeButton
                setSignupCompanyFormData={setSignupCompanyFormData}
                signupCompanyFormData={signupCompanyFormData}
              />
              <SignUpCompanyName
                setSignupCompanyFormData={setSignupCompanyFormData}
                signupCompanyFormData={signupCompanyFormData}
              />
              <SignUpCompanyId
                signupCompanyFormData={signupCompanyFormData}
                setSignupCompanyFormData={setSignupCompanyFormData}
              />
            </div>
          )}

          <StyleLoginSignUpBtn>회원가입 하기</StyleLoginSignUpBtn>
        </form>
      </StyleLoginSignUpBoxDiv>
    </StyleLoginSignUpDiv>
  );
};

export default Signup;
