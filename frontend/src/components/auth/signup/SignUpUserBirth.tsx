import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { useState } from "react";

type SignUpUserBirthProps = {
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  signupUserFormData: SignupFormData;
};

const SignUpUserBirth = ({
  setSignupUserFormData,
  signupUserFormData,
}: SignUpUserBirthProps) => {
  const [userBirth, setUserBirth] = useState<null | String>(null);
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const date = new Date(e.target.value);
    if (!date) return "";
    else {
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const birthday = `${year}${month}${day}`; // 문자열 형식으로 저장합니다.
      setSignupUserFormData({
        ...signupUserFormData,
        identifynumber: birthday,
      });
      setUserBirth(birthday);
    }
  };

  return (
    <StyleSignUpInputDiv>
      <label htmlFor="userbirth">생년월일</label>
      <br />
      <input tabIndex={5} type="date" onChange={(e) => handleDateChange(e)} />
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserBirth;
