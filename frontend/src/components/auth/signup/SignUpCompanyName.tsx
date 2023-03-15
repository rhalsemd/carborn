import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { StyleSignUpUserNameDiv } from "../../../routes/Signup"
import { SignupFormData } from "./SignUpButton";

//타입 지정
export type SignUpUserNameProps = {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: Dispatch<SetStateAction<SignupFormData>>;
}

const SignUpCompanyName = ({signupCompanyFormData, setSignupCompanyFormData} : SignUpUserNameProps) => {
  // 회원가입 이름 세팅
  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/;
    if (regex.test(e.target.value)) {
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        name: e.target.value,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || (e.key >= "0" && e.key <= "9")) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      if (/^[가-힣]+$/.test(signupCompanyFormData.name)) {
        alert("입력한 이름이 유효합니다.");
      } else {
        alert("이름은 꼭 한글명입니다.");
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          name: "",
        });
      }
    }
  };

  return (
    <div>
      <StyleSignUpUserNameDiv>
        <label htmlFor="companyname">회사명</label>
        <br />
        <input
          type="text"
          id="companyname"
          placeholder="회사명을 입력해주세요(ex. (주)싸피)"
          value={signupCompanyFormData.name}
          onKeyDown={(e) => handleKeyPress(e)}
          onChange={(e) => handleUserName(e)}
        />
      </StyleSignUpUserNameDiv>
    </div>
  )
}

export default SignUpCompanyName