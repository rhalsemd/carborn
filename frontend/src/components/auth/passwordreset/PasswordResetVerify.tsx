import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SignUpUserPhoneNumberModal from "../signup/modal/SignUpUserPhoneNumberModal";
import { PasswordResetInputObj } from "../../../routes/PasswordResetCheck";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type PasswordResetVerifyProps = {
  setinputObj: React.Dispatch<React.SetStateAction<PasswordResetInputObj>>;
  inputObj: PasswordResetInputObj;
};

const PasswordResetVerify = ({
  setinputObj,
  inputObj,
}: PasswordResetVerifyProps) => {
  const [isValid, setIsValid] = useState(false);

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (
      inputObj.phonenumber.length <= 10 &&
      inputObj.phonenumber.length <= 11
    ) {
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
      setinputObj({
        ...inputObj,
        isVerify: true,
      });
    }
  }, [isValid]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setinputObj({
      ...inputObj,
      phonenumber: value,
    });
  };

  return (
    <StyleLoginInputDiv>
      <label htmlFor="passwordResetPhonenumber">전화번호</label>
      <input
        type="text"
        id="passwordResetPhonenumber"
        name="passwordResetPhonenumber"
        autoComplete="off"
        placeholder="전화번호 11자리(10자리)를 입력해주세요."
        value={inputObj.phonenumber}
        onChange={handleChange}
      />
      <button onClick={openModal}>인증하러가기</button>

      {/* 모달 */}
      <SignUpUserPhoneNumberModal
        open={isModalOpen}
        onClose={closeModal}
        phoneNumber={inputObj.phonenumber}
        setIsValid={setIsValid}
        isValid={isValid}
      />
    </StyleLoginInputDiv>
  );
};

export default PasswordResetVerify;
