import { SetStateAction, Dispatch, useState, ChangeEvent } from "react";
import { StyleSignUpInputDiv } from "../../../routes/Signup";
import { SignupFormData } from "./SignUpButton";

type SignUpCompanyBusinessNumberProps = {
  setSignupCompanyFormData: Dispatch<SetStateAction<SignupFormData>>
  signupCompanyFormData: SignupFormData
}

const SignUpCompanyBusinessNumber = ({setSignupCompanyFormData, signupCompanyFormData}:SignUpCompanyBusinessNumberProps) => {
  const [businessNumber, setBusinessNumber] = useState<string>(signupCompanyFormData.identifynumber);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (/^[0-9]{0,10}$/.test(value)) {
      setBusinessNumber(value);
      setShowWarning(false);
      if (e.target.value.length === 10) {
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          identifynumber: e.target.value
        })
      }
    }
    else {
      if (!showWarning) {
        alert("숫자만 입력 가능합니다.")
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 200); // 1초 후에 상태값 초기화
      }
    }
  };

  return (
    <StyleSignUpInputDiv>
      <label htmlFor="businessNumber">사업자등록번호</label><br />
      <input
        type="text"
        id="businessNumber"
        name="businessNumber"
        autoComplete="off"
        placeholder="숫자만 입력해주세요"
        maxLength={10}
        value={businessNumber}
        onChange={(e) => handleInputChange(e)}
      />
    </StyleSignUpInputDiv>
  )
}

export default SignUpCompanyBusinessNumber;