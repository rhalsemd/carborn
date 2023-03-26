import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  companyidCheck,
  companyidCheckReset,
} from "../../../modules/UserIdCheckModule";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { useridCheckReset } from "../../../modules/UserIdCheckModule";

type SignUpCompanyIdProps = {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: React.Dispatch<
    React.SetStateAction<SignupFormData>
  >;
};
const SignUpCompanyId = ({
  signupCompanyFormData,
  setSignupCompanyFormData,
}: SignUpCompanyIdProps) => {
  const dispatch = useDispatch();
  const { companyidcheck } = useSelector((state: any) => state.IdCheckReducer);

  // 입력되는거 formdata에 넘겨주기
  const handleUserId = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-z0-9_]+(\s*[a-z0-9_]+)*$/i;
    const { value } = e.target;
    if (value === "" || regex.test(value)) {
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        userid: value,
      });
    }
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
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          userid: "",
        });
      } else if (!isValidLength) {
        alert("아이디 길이는 5글자에서 20글자입니다.");
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          userid: "",
        });
      } else {
        alert(
          "입력하신 아이디가 영어 대소문자와 숫자가 아니거나, 길이가 5글자이하 또는 20글자 이상입니다."
        );
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          userid: "",
        });
      }
    }
  };

  // 아이디 중복체크용
  const userIdDuplicateCheck = (e: any) => {
    dispatch(companyidCheck(signupCompanyFormData.userid));
  };

  useEffect(() => {
    if (companyidcheck === true) {
      alert("사용가능한 아이디 입니다.");
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        idcheck: true,
      });
    } else if (companyidcheck === false) {
      alert("중복된 아이디가 있습니다. 다른 아이디로 회원가입 해주세요.");
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        idcheck: false,
        userid: "",
      });
    }
    dispatch(useridCheckReset());
    dispatch(companyidCheckReset());
  }, [companyidcheck]);

  return (
    <StyleSignUpInputDiv>
      <label htmlFor="companyid">아이디</label>
      <br />
      <input
        tabIndex={2}
        type="text"
        id="companyid"
        name="companyid"
        placeholder="아이디"
        autoComplete="off"
        required
        value={signupCompanyFormData.userid}
        onChange={(e) => handleUserId(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <input
        tabIndex={3}
        type="button"
        onClick={(e) => {
          userIdDuplicateCheck(e);
        }}
        value={`중복체크`}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyId;
