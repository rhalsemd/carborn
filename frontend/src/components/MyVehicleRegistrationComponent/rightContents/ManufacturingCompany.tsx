/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  Props,
  RegistrationInfo,
} from "../../../routes/userUseFnc/MyVehicleRegistration";

export const titleStyle = css`
  font-weight: 900;
`;

export const inputBoxStyle = css`
  width: 100%;
  margin-top: 1vh;
  height: 4vh;
  border-radius: 4px;
  border-color: #d9d9d9;
  margin-bottom: 1vh;
  &:focus {
    outline: none;
    border-color: #9b9b9b;
  }
`;

function ManufacturingCompany({
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  const inputTyping = (e: React.FocusEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    setRegistrationInfo((registrationInfo) => {
      return {
        ...registrationInfo,
        manufacturingCompany: inputValue,
      };
    });
  };

  return (
    <div>
      <span css={titleStyle}>제조사</span>
      <div>
        <input
          css={inputBoxStyle}
          type="text"
          autoComplete="false"
          onBlur={inputTyping}
        />
      </div>
    </div>
  );
}

export default ManufacturingCompany;
