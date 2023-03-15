import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import SignUpButton, {
  SignupFormData,
} from "../components/auth/signup/SignUpButton";
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
import SignUpUserPassword from "../components/auth/signup/SignUpUserPassword";
import SignUpCompanyPassword from "../components/auth/signup/SignUpCompanyPassword";
import SignUpUserPasswordCheck from "../components/auth/signup/SignUpUserPasswordCheck";
import SignUpCompanyPasswordCheck from "../components/auth/signup/SignUpCompanyPasswordCheck";

// CSS
export const StyleSignUpInputDiv = styled.div`
  width: 100%;
  padding-left: 2rem;
`;
const Signup = () => {
  // 상수화
  const USER = 0;

  // 회원구분 세팅 및 전송 데이터 형태 구축
  const [selectedButton, setSelectedButton] = useState(USER);
  // 회원가입 초기값
  const initialSignupFormData = {
    accountType: USER,
    name: "",
    id: "",
    password: "",
    passwordcheck: false,
    birth: "",
    address: "",
    phonenumber: "",
    FileList: [],
  };

  const [signupUserFormData, setSignupUserFormData] = useState<SignupFormData>(
    initialSignupFormData
  );
  const [signupCompanyFormData, setSignupCompanyFormData] =
    useState<SignupFormData>(initialSignupFormData);

  // 이거 나중에 통신할때 급하게 테스트 필요할수도 있으니까 놔둠
  useEffect(() => {
    // if (selectedButton===USER) {
    //   console.log(signupUserFormData)
    // } else {
    //   console.log(signupCompanyFormData)
    // }
  }, [selectedButton, signupUserFormData, signupCompanyFormData]);

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
          {selectedButton === USER ? (
            <div>
              <SignUpUserName
                setSignupUserFormData={setSignupUserFormData}
                signupUserFormData={signupUserFormData}
              />
              <SignUpUserId
                setSignupUserFormData={setSignupUserFormData}
                signupUserFormData={signupUserFormData}
              />
              <SignUpUserPassword
                setSignupUserFormData={setSignupUserFormData}
                signupUserFormData={signupUserFormData}
              />
              <SignUpUserPasswordCheck
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
              <SignUpCompanyPassword
                signupCompanyFormData={signupCompanyFormData}
                setSignupCompanyFormData={setSignupCompanyFormData}
              />
              <SignUpCompanyPasswordCheck
                signupCompanyFormData={signupCompanyFormData}
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
