import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SignUpUserPhoneNumberModal from "../signup/modal/SignUpUserPhoneNumberModal";
import { SearchInputType } from "../../../routes/auth/SearchID";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type SearchIDVerifyProps = {
  setSearchInput: React.Dispatch<React.SetStateAction<SearchInputType>>;
  searchInput: SearchInputType;
};

const SearchIDPhoneNumberVerify = ({ setSearchInput, searchInput }: SearchIDVerifyProps) => {
  const [isValid, setIsValid] = useState(false);

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (
      searchInput.phonenumber.length <= 10 &&
      searchInput.phonenumber.length <= 11
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
      setSearchInput({
        ...searchInput,
        isVerify: true,
      });
    }
  }, [isValid]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput({
      ...searchInput,
      phonenumber: value,
    });
  };

  return (
    <StyleLoginInputDiv>
      <label htmlFor="searchIDPhoneNumber">전화번호</label>
      <input
        type="text"
        id="searchIDPhoneNumber"
        name="searchIDPhoneNumber"
        autoComplete="off"
        placeholder="SearchName"
        value={searchInput.phonenumber}
        onChange={handleChange}
      />
      <button onClick={openModal}>인증하러가기</button>

      {/* 모달 */}
      <SignUpUserPhoneNumberModal
        open={isModalOpen}
        onClose={closeModal}
        phoneNumber={searchInput.phonenumber}
        setIsValid={setIsValid}
        isValid={isValid}
      />
    </StyleLoginInputDiv>
  );
};

export default SearchIDPhoneNumberVerify;
