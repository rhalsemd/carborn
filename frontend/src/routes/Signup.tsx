import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
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
import SignUpUserBirth from "../components/auth/signup/SignUpUserBirth";
import SignUpCompanyBusinessNumber from "../components/auth/signup/SignUpCompanyBusinessNumber";
import SignUpUserAddress from "../components/auth/signup/SignUpUserAddress";
import SignUpCompanyAddress from "../components/auth/signup/SignUpCompanyAddress";
import SignUpUserPhoneNumber from "../components/auth/signup/SignUpUserPhoneNumber";
import SignUpCompanyPhoneNumber from "../components/auth/signup/SignUpCompanyPhoneNumber";
import SignUpCompanyDocument from "../components/auth/signup/SignUpCompanyDocument";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL, ContentType } from "../lib/loginApi";

// CSS
export const StyleSignUpInputDiv = styled.div`
  width: 100%;
  padding-left: 2rem;
`;
const Signup: React.FC = () => {
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
  const USER = 0;

  // 회원구분 세팅 및 전송 데이터 형태 구축
  const [selectedButton, setSelectedButton] = useState(USER);
  // 회원가입 초기값
  const initialSignupFormData = {
    accountType: USER,
    name: "",
    id: "",
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

  // 이미지랑 회원정보같이 보내기
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles(fileList);
    }
  };

  // 콘솔로 파일 입력 체크하기
  if (isUser) {
    console.log(signupUserFormData);
  } else {
    console.log(signupCompanyFormData);
    console.log(selectedFiles);
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // 일반 정보들을 여기에 담는다 (일단 유저인 경우)
    const formData = new FormData();
    if (isUser) {
      formData.append("accountType", String(signupUserFormData.accountType));
      formData.append("name", signupUserFormData.name);
      formData.append("id", signupUserFormData.id);
      formData.append("password", signupUserFormData.password);
      formData.append(
        "passwordcheck",
        String(signupUserFormData.passwordcheck)
      );
      formData.append("identifynumber", signupUserFormData.identifynumber);
      formData.append("address", signupUserFormData.address);
      formData.append("isVarify", String(signupUserFormData.isVarify));
    } else {
      formData.append("accountType", String(signupCompanyFormData.accountType));
      formData.append("name", signupCompanyFormData.name);
      formData.append("id", signupCompanyFormData.id);
      formData.append("password", signupCompanyFormData.password);
      formData.append(
        "passwordcheck",
        String(signupCompanyFormData.passwordcheck)
      );
      formData.append("identifynumber", signupCompanyFormData.identifynumber);
      formData.append("address", signupCompanyFormData.address);
      formData.append("isVarify", String(signupCompanyFormData.isVarify));

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }
    }

    // // formdata 확인하는 방법
    // for (const pair of formData.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }

    const multipart_formData = "multipart/form-data"

    try {
      const response = 
      await axios({
        method:'POST',
        url: `${API_URL}/signup`,
        headers: {
          [ContentType] : multipart_formData,
        },
        data : formData
      })

      // // formdata 확인하는 방법
      // for (const pair of response.data.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]); 
      // }
      return response.data
    } catch (error) {
      console.error(error); // 오류 처리
    }
  };

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
          isUser={isUser}
          setIsUser={setIsUser}
          setIddupliCheck={setIddupliCheck}
          iddupliCheck={iddupliCheck}
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
                setIddupliCheck={setIddupliCheck}
                iddupliCheck={iddupliCheck}
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
                setIddupliCheck={setIddupliCheck}
                iddupliCheck={iddupliCheck}
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
              />
              <SignUpCompanyDocument
                handleFileChange={handleFileChange}
                selectedFiles={selectedFiles}
              />
            </div>
          )}
        </div>
        <StyleLoginSignUpBtn type="button" onClick={(e) => handleSubmit(e)}>회원가입 하기</StyleLoginSignUpBtn>
      </StyleLoginSignUpBoxDiv>
    </StyleLoginSignUpDiv>
  );
};

export default Signup;
