import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { StyleSignUpInputDiv } from "../../../routes/Signup"
import { SignupFormData } from "./SignUpButton";

//타입 지정
export type SignUpUserNameProps = {
  signupUserFormData: SignupFormData;
  setSignupUserFormData: Dispatch<SetStateAction<SignupFormData>>;
}

const SignUpUserName = ({setSignupUserFormData, signupUserFormData}:SignUpUserNameProps) => {
  // 회원가입 이름 세팅
  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/;
    if (regex.test(e.target.value)) {
      setSignupUserFormData({
        ...signupUserFormData,
        name: e.target.value,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || (e.key >= "0" && e.key <= "9")) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (/^[가-힣]+$/.test(signupUserFormData.name)) {
        alert("입력한 이름이 유효합니다.");
      } else {
        alert("이름은 꼭 한글명입니다.");
        setSignupUserFormData({
          ...signupUserFormData,
          name: "",
        });
      }
    }
  };

  return (
    <StyleSignUpInputDiv>
      <label htmlFor="username">이름</label>
      <br />
      <input
        type="text"
        id="username"
        placeholder="이름을 입력해주세요(ex. 홍길동)"
        value={signupUserFormData.name}
        onKeyDown={(e) => handleKeyPress(e)}
        onChange={(e) => handleUserName(e)}
      />
    </StyleSignUpInputDiv>
  )
}

export default SignUpUserName