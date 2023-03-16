import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useridCheck } from "../../../modules/idcheckModule";
import { StyleSignUpInputDiv } from "../../../routes/Signup";
import { SignupFormData } from "./SignUpButton";

type SignUpUserIdProps = {
  setSignupUserFormData: Dispatch<SetStateAction<SignupFormData>>;
  signupUserFormData: SignupFormData;
};

const SignUpUserId = ({
  setSignupUserFormData,
  signupUserFormData,
}: SignUpUserIdProps) => {
  const { useridcheck } = useSelector((state: any) => state.useridcheck);
  const dispatch = useDispatch();

  // 입력되는거 formdata에 넘겨주기
  const handleUserId = (e: ChangeEvent<HTMLInputElement>) => {
    // 타이핑하는순간 아이디중복체크 초기화됨
    setSignupUserFormData({
      ...signupUserFormData,
      id: e.target.value,
    });
  };

  // 아이디 유효성 : 영문자 소문자랑 숫자랑 _ 만 가능가능
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const regex = /^[a-z0-9_]+$/;
      const isValidLength =
        e.currentTarget.value.length >= 5 && e.currentTarget.value.length <= 20;
      if (regex.test(e.currentTarget.value) && isValidLength) {
        alert("입력한 아이디가 유효합니다.");
      } else if (!regex.test(e.currentTarget.value)) {
        alert("아이디는 영어 소문자와 숫자, _만 가능합니다.");
        setSignupUserFormData({
          ...signupUserFormData,
          id: "",
        });
      } else if (!isValidLength) {
        alert("아이디 길이는 5글자에서 20글자입니다.");
        setSignupUserFormData({
          ...signupUserFormData,
          id: "",
        });
      } else {
        alert(
          "입력하신 아이디가 영어 대소문자와 숫자가 아니거나, 길이가 5글자이하 또는 20글자 이상입니다."
        );
        setSignupUserFormData({
          ...signupUserFormData,
          id: "",
        });
      }
    }
  };

  // 아이디 중복체크용
  const userIdDuplicateCheck = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    dispatch(useridCheck(signupUserFormData.id));
  };
  
  useEffect(() => {
    if (useridcheck === true) {
      alert("사용 가능한 아이디 입니다.");
    } else if (useridcheck === false) {
      alert("중복된 아이디가 있습니다. 다른 아이디로 회원가입 해주세요.");
    }
  }, [useridcheck]);

  return (
    <StyleSignUpInputDiv>
      <label htmlFor="userid">아이디</label>
      <br />
      <input
        type="text"
        id="userid"
        placeholder="아이디를 입력해주세요(ex. ssafy123)"
        autoComplete="off"
        required
        value={signupUserFormData.id}
        onChange={(e) => handleUserId(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <button
        onClick={(e) => {
          userIdDuplicateCheck(e);
        }}
      >
        중복체크
      </button>
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserId;
