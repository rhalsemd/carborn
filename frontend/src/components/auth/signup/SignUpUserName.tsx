import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";

//타입 지정
export type SignUpUserNameProps = {
  signupUserFormData: SignupFormData;
  setSignupUserFormData: Dispatch<SetStateAction<SignupFormData>>;
};

const SignUpUserName = ({
  setSignupUserFormData,
  signupUserFormData,
}: SignUpUserNameProps) => {
  // 회원가입 이름 세팅
  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const regex = /^[가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/;
    if (regex.test(e.target.value)) {
      setSignupUserFormData({
        ...signupUserFormData,
        name: e.target.value,
      });
    } else {
      alert("한글 이름만 가능합니다. 한영키를 눌러주세요.");
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
        tabIndex={1}
        type="text"
        id="username"
        placeholder="이름을 입력해주세요(ex. 홍길동)"
        maxLength={4}
        autoComplete="off"
        value={signupUserFormData.name}
        onKeyDown={(e) => handleKeyPress(e)}
        onChange={(e) => handleUserName(e)}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserName;
