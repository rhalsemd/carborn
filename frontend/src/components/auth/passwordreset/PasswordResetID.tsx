import React from "react";
import styled from "@emotion/styled";
import { PasswordResetInputObj } from "../../../routes/PasswordResetCheck";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type PasswordResetIDProps = {
  setinputObj: React.Dispatch<React.SetStateAction<PasswordResetInputObj>>;
  inputObj: PasswordResetInputObj;
};

const PasswordResetID = ({ setinputObj, inputObj }: PasswordResetIDProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setinputObj({
      ...inputObj,
      userid: value,
    });
  };

  return (
    <StyleLoginInputDiv>
      <label htmlFor="PasswordResetId">아이디</label>
      <input
        type="text"
        id="PasswordResetId"
        name="PasswordResetId"
        autoComplete="off"
        placeholder="아이디를 작성해주세요."
        onChange={(e) => handleChange(e)}
      />
    </StyleLoginInputDiv>
  );
};

export default PasswordResetID;
