import { StyleSignUpInputDiv } from "../../../routes/Signup";
import { SignupFormData } from "./SignUpButton";
import { useState } from "react";

type SignUpUserBirthProps = {
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  signupUserFormData: SignupFormData;
}

const SignUpUserBirth = ({setSignupUserFormData, signupUserFormData}:SignUpUserBirthProps) => {
  const [userBirth, setUserBirth] = useState<null | String>(null);
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    console.log(date)
    if (!date) return "";
    else {
      const year = date.getFullYear().toString();
      console.log(year)
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      console.log(month)
      const day = date.getDate().toString().padStart(2, "0");
      console.log(day)
      const birthday = `${year}${month}${day}`; // 문자열 형식으로 저장합니다.
      console.log(birthday)
      setSignupUserFormData({
        ...signupUserFormData,
        identifynumber: birthday,
      });
      setUserBirth(birthday);
    }
  }

  return (
    <StyleSignUpInputDiv>
      <label htmlFor="userbirth">생년월일</label>
      <br />
      <input type="date" onChange={(e) => handleDateChange(e)} />
    </StyleSignUpInputDiv>
  )
}

export default SignUpUserBirth;