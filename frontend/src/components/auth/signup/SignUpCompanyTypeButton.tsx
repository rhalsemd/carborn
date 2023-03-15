import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { SignupFormData } from "./SignUpButton";

//타입 지정
export type SignUpProps = {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: Dispatch<SetStateAction<SignupFormData>>;
}

const StyleSignUpCompanyTypeButtonTypeDiv = styled.div`
  margin-left: 2rem;
`

const SignUpCompanyTypeButton = ({signupCompanyFormData, setSignupCompanyFormData}:SignUpProps) => {
  const handleRepairType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      usertype: "1"
    })
  }
  const handleInspectorType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      usertype: "2"
    })
  }
  const handleInsuranceType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      usertype: "3"
    })
  }

  return (
    <StyleSignUpCompanyTypeButtonTypeDiv>
      <button onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleRepairType(e)}>정비소</button>
      <button onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleInspectorType(e)}>검수원</button>
      <button onClick={(e:React.MouseEvent<HTMLButtonElement>) => handleInsuranceType(e)}>보험사</button>
    </StyleSignUpCompanyTypeButtonTypeDiv>
  )
}

export default SignUpCompanyTypeButton;