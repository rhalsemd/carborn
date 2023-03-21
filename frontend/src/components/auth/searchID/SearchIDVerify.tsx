import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { SearchInputObj } from "../../../routes/auth/SearchID";
import SignUpUserPhoneNumberModal from "../signup/modal/SignUpUserPhoneNumberModal";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type SearchIDVerifyProps = {
  setinputObj: React.Dispatch<React.SetStateAction<SearchInputObj>>;
  inputObj: SearchInputObj;
};

const SearchIDVerify = ({ setinputObj, inputObj }: SearchIDVerifyProps) => {
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
      <span>전화번호</span>
      <input
        type="number"
        id="SearchName"
        autoComplete="off"
        placeholder="SearchName"
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

export default SearchIDVerify;
