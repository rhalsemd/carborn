/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import SaleInfoArea from "../../components/SaleRegistrationComponents/rightContents/SaleInfoArea";
import SaleCarImg from "./../../components/SaleRegistrationComponents/leftContents/SaleCarImg";
import { useState } from "react";
import { RegistrationInfo } from "./MyVehicleRegistration";
import Nav2 from "./../../components/Nav2";

const outer = css`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const content = css`
  display: flex;
  align-items: center;
`;

function SaleRegistration() {
  const [registrationInfo, setRegistrationInfo] = useState<
    Partial<RegistrationInfo>
  >({
    fileList: [],
    fileNames: [],
  });

  return (
    <>
      <Nav2 />
      <div css={outer}>
        <div css={content}>
          {/* 왼쪽 컨텐츠 */}
          <SaleCarImg />
          {/* 오른쪽 컨텐츠*/}
          <SaleInfoArea
            setRegistrationInfo={setRegistrationInfo}
            registrationInfo={registrationInfo}
          />
        </div>
      </div>
    </>
  );
}

export default SaleRegistration;
