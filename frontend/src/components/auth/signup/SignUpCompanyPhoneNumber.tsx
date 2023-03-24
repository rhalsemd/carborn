import { useEffect, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPages";
import { SignupFormData } from "./SignUpButton";
import SignUpUserPhoneNumberModal from "./modal/SignUpUserPhoneNumberModal";

export interface SignUpUserPhoneNumberState {
  phoneNumber: string;
  isVerified: boolean;
  error: string;
}

export type SignUpCompanyPhoneNumberProps = {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: React.Dispatch<
    React.SetStateAction<SignupFormData>
  >;
  setIsValid:any;
  isValid:boolean;
};

const SignUpCompanyPhoneNumber = ({
  setSignupCompanyFormData,
  signupCompanyFormData,
  setIsValid,
  isValid
}: SignUpCompanyPhoneNumberProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (value: string) => {
    setPhoneNumber(value);
  };

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (phoneNumber.length <= 10 && phoneNumber.length <= 11) {
      alert("휴대폰 번호는 10자리이상 11자리 이하 여야합니다.");
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isValid) {
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        isVarify: true,
      });
    }
  }, [isValid]);

  return (
    <StyleSignUpInputDiv>
      <label htmlFor="phoneNumber">휴대폰 번호</label>
      <br />
      <input
        tabIndex={8}
        type="text"
        id="phoneNumber"
        value={phoneNumber}
        autoComplete="off"
        onChange={(e) => handleChange(e.target.value)}
        maxLength={11}
      />
      <button tabIndex={9} onClick={openModal}>인증하러가기</button>

      {/* 모달 */}
      <SignUpUserPhoneNumberModal
        open={isModalOpen}
        onClose={closeModal}
        phoneNumber={phoneNumber}
        setIsValid={setIsValid}
        isValid={isValid}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyPhoneNumber;
