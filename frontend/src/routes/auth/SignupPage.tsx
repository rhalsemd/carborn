import styled from "@emotion/styled";
import { useState, useEffect, ButtonHTMLAttributes, useCallback } from "react";
import SignUpButton, {
  SignupFormData,
} from "../../components/auth/signup/SignUpButton";
import SignUpCompanyId from "../../components/auth/signup/SignUpCompanyId";
import SignUpCompanyName from "../../components/auth/signup/SignUpCompanyName";
import SignUpCompanyTypeButton from "../../components/auth/signup/SignUpCompanyTypeButton";
import SignUpUserId from "../../components/auth/signup/SignUpUserId";
import SignUpUserName from "../../components/auth/signup/SignUpUserName";
import {
  StyleLoginSignUpBoxDiv,
  StyleLoginSignUpDiv,
  StyleLoginSignUpTitle,
} from "./LoginPage";
import SignUpUserPassword from "../../components/auth/signup/SignUpUserPassword";
import SignUpCompanyPassword from "../../components/auth/signup/SignUpCompanyPassword";
import SignUpUserPasswordCheck from "../../components/auth/signup/SignUpUserPasswordCheck";
import SignUpCompanyPasswordCheck from "../../components/auth/signup/SignUpCompanyPasswordCheck";
import SignUpUserBirth from "../../components/auth/signup/SignUpUserBirth";
import SignUpCompanyBusinessNumber from "../../components/auth/signup/SignUpCompanyBusinessNumber";
import SignUpUserAddress from "../../components/auth/signup/SignUpUserAddress";
import SignUpCompanyAddress from "../../components/auth/signup/SignUpCompanyAddress";
import SignUpUserPhoneNumber from "../../components/auth/signup/SignUpUserPhoneNumber";
import SignUpCompanyPhoneNumber from "../../components/auth/signup/SignUpCompanyPhoneNumber";
import SignUpCompanyDocument from "../../components/auth/signup/SignUpCompanyDocument";
import axios from "axios";
import { API_URL, ContentType } from "../../lib/api";
import Nav from "../../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { SetIsSignupAction } from "../../modules/signUpModule";

// CSS 타입
export interface StyleGoRegisterProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

// CSS
export const StyleSignUpInputDiv = styled.div`
  width: 100%;
  padding-left: 2rem;
`;

export const StyleGoRegister = styled.button<StyleGoRegisterProps>`
  width: 15rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  border: none;
  margin: 0.5rem 0;
  cursor: pointer;
`;

const SignupPages: React.FC = () => {
  const dispatch = useDispatch();
  // 아이디 중복체크 후, ALERT 안뜨게 하기 위한 로직
  const [iddupliCheck, setIddupliCheck] = useState<boolean | null | undefined>(
    undefined
  );
  // 비밀번호 재확인 입력창 먼저 기입했을때, 받는 데이터
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [secondPassword, setSecondPassword] = useState<string>("");
  // 유저인지 기업인지
  const [isUser, setIsUser] = useState<boolean>(true);
  // 상수화
  const USER: number = 0;

  // 회원구분 세팅 및 전송 데이터 형태 구축
  const [selectedButton, setSelectedButton] = useState(USER);
  // 회원가입 초기값
  const initialSignupFormData = {
    accountType: USER,
    name: "",
    userid: "",
    idcheck: null,
    password: "",
    passwordcheck: false,
    identifynumber: "",
    address: "",
    isVarify: false,
  };

  const [signupUserFormData, setSignupUserFormData] = useState<SignupFormData>(
    initialSignupFormData
  );
  const [signupCompanyFormData, setSignupCompanyFormData] =
    useState<SignupFormData>(initialSignupFormData);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles(fileList);
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // 일반 정보들을 여기에 담는다 (일단 유저인 경우)
    const formData = new FormData();
    if (isUser) {
      formData.append("accountType", JSON.stringify(String(signupUserFormData.accountType)));
      formData.append("name", JSON.stringify(signupUserFormData.name));
      formData.append("id", JSON.stringify(signupUserFormData.userid));
      formData.append("password", JSON.stringify(signupUserFormData.password));
      formData.append(
        "passwordcheck",
        JSON.stringify(String(signupUserFormData.passwordcheck))
      );
      formData.append("identifynumber", JSON.stringify(signupUserFormData.identifynumber));
      formData.append("address", JSON.stringify(signupUserFormData.address));
      formData.append("isVarify", JSON.stringify(String(signupUserFormData.isVarify)));
    } else {
      formData.append("accountType", JSON.stringify(String(signupCompanyFormData.accountType)));
      formData.append("name", JSON.stringify(signupCompanyFormData.name));
      formData.append("id", JSON.stringify(signupCompanyFormData.userid));
      formData.append("password", JSON.stringify(signupCompanyFormData.password));
      formData.append(
        "passwordcheck",
        JSON.stringify(String(signupCompanyFormData.passwordcheck))
      );
      formData.append("identifynumber", JSON.stringify(signupCompanyFormData.identifynumber));
      formData.append("address", JSON.stringify(signupCompanyFormData.address));
      formData.append("isVarify", JSON.stringify(String(signupCompanyFormData.isVarify)));
      formData.append("images", JSON.stringify(selectedFiles))
    }

    // // formdata 확인하는 방법
    // for (const pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]);
    // }

    const multipart_formData = "multipart/form-data";

    // 액션 작업해야할듯
    // 그리고 액션 끝나고 나면, 다시 버튼 회색으로 바꾸기
    try {
      const response = await axios({
        method: "POST",
        url: `${API_URL}/signup`,
        headers: {
          [ContentType]: multipart_formData,
        },
        data: formData,
      });

      return response.data;
    } catch (error) {
      console.error(error); // 오류 처리
    }
  };

  // 회원가입 버튼 색깔 바꾸기 기능
  const SignUpisValid = useSelector((state: any) => state.SignUpReducer.success);
  const accountType = useSelector((state:any) => state.setAccountTypeReducer.accountType)
  
  // isValid 값을 업데이트하는 함수
  const updateIsValid = useCallback(() => {
    let valid: boolean = false;
    if (accountType === USER) {
      valid = Boolean(
        signupUserFormData.name &&
          signupUserFormData.userid &&
          signupUserFormData.idcheck &&
          signupUserFormData.password &&
          signupUserFormData.passwordcheck &&
          signupUserFormData.identifynumber &&
          signupUserFormData.address &&
          signupUserFormData.isVarify
      );
    } else {
      valid = Boolean(
        signupCompanyFormData.name &&
        signupCompanyFormData.userid &&
        signupCompanyFormData.idcheck &&
        signupCompanyFormData.password &&
        signupCompanyFormData.passwordcheck &&
        signupCompanyFormData.identifynumber &&
        signupCompanyFormData.address &&
        signupCompanyFormData.isVarify &&
        selectedFiles.length
      );
    }
    dispatch(SetIsSignupAction(valid));
  }, [dispatch, selectedFiles, signupUserFormData, signupCompanyFormData]);

  useEffect(() => {
    updateIsValid();
    // console.log(isValid)
    // console.log(Boolean(signupCompanyFormData.name));
    // console.log(Boolean(signupCompanyFormData.userid));
    // console.log(Boolean(signupCompanyFormData.idcheck));
    // console.log(Boolean(signupCompanyFormData.password));
    // console.log(Boolean(signupCompanyFormData.passwordcheck));
    // console.log(Boolean(signupCompanyFormData.identifynumber));
    // console.log(Boolean(signupCompanyFormData.address));
    // console.log(Boolean(signupCompanyFormData.isVarify));
    // console.log(selectedFiles.length === 0 ? false : true, "회사용");
    // console.log(selectedFiles.length);
  }, [updateIsValid, SignUpisValid, signupCompanyFormData]);

  // 휴대전화 인증번호
  const [isValid, setIsValid] = useState(false);

  return (
    <div>
      <Nav />
      <StyleLoginSignUpDiv>
        <StyleLoginSignUpBoxDiv>
          <StyleLoginSignUpTitle>
            <h2>회원가입</h2>
          </StyleLoginSignUpTitle>
          <SignUpButton
            setSelectedButton={setSelectedButton}
            selectedButton={selectedButton}
            setSignupUserFormData={setSignupUserFormData}
            signupUserFormData={signupUserFormData}
            setSignupCompanyFormData={setSignupCompanyFormData}
            signupCompanyFormData={signupCompanyFormData}
            isUser={isUser}
            setIsUser={setIsUser}
            setIddupliCheck={setIddupliCheck}
            iddupliCheck={iddupliCheck}
            setIsValid={setIsValid}
            isValid={isValid}
          />
          <div>
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
                  secondPassword={secondPassword}
                  setIsPasswordValid={setIsPasswordValid}
                />
                <SignUpUserPasswordCheck
                  signupUserFormData={signupUserFormData}
                  setSignupUserFormData={setSignupUserFormData}
                  secondPassword={secondPassword}
                  setSecondPassword={setSecondPassword}
                  setIsPasswordValid={setIsPasswordValid}
                  isPasswordValid={isPasswordValid}
                />
                <SignUpUserBirth
                  setSignupUserFormData={setSignupUserFormData}
                  signupUserFormData={signupUserFormData}
                />
                <SignUpUserAddress
                  setSignupUserFormData={setSignupUserFormData}
                  signupUserFormData={signupUserFormData}
                />
                <SignUpUserPhoneNumber
                  setSignupUserFormData={setSignupUserFormData}
                  signupUserFormData={signupUserFormData}
                  setIsValid={setIsValid}
                  isValid={isValid}
                />
              </div>
            ) : (
              <div>
                <SignUpCompanyTypeButton
                  setSignupCompanyFormData={setSignupCompanyFormData}
                  signupCompanyFormData={signupCompanyFormData}
                  setIsValid={setIsValid}
                  isValid={isValid}
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
                  secondPassword={secondPassword}
                  setIsPasswordValid={setIsPasswordValid}
                />
                <SignUpCompanyPasswordCheck
                  signupCompanyFormData={signupCompanyFormData}
                  setSignupCompanyFormData={setSignupCompanyFormData}
                  secondPassword={secondPassword}
                  setSecondPassword={setSecondPassword}
                  isPasswordValid={isPasswordValid}
                  setIsPasswordValid={setIsPasswordValid}
                />
                <SignUpCompanyBusinessNumber
                  setSignupCompanyFormData={setSignupCompanyFormData}
                  signupCompanyFormData={signupCompanyFormData}
                />
                <SignUpCompanyAddress
                  setSignupCompanyFormData={setSignupCompanyFormData}
                  signupCompanyFormData={signupCompanyFormData}
                />
                <SignUpCompanyPhoneNumber
                  setSignupCompanyFormData={setSignupCompanyFormData}
                  signupCompanyFormData={signupCompanyFormData}
                  setIsValid={setIsValid}
                  isValid={isValid}
                />
                <SignUpCompanyDocument handleFileChange={handleFileChange} />
              </div>
            )}
          </div>
          <StyleGoRegister
            type="button"
            tabIndex={13}
            backgroundColor={SignUpisValid ? "#d23131" : "grey"}
            onClick={(e) => handleSubmit(e)}
          >
            회원가입 하기
          </StyleGoRegister>
        </StyleLoginSignUpBoxDiv>
      </StyleLoginSignUpDiv>
    </div>
  );
};

export default SignupPages;
