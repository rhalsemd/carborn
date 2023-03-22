/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Nav from "../../components/Nav";
import SaleInfoArea from "../../components/SaleRegistrationComponents/rightContents/SaleInfoArea";
import SaleCarImg from "./../../components/SaleRegistrationComponents/leftContents/SaleCarImg";
import { useState } from "react";
import { RegistrationInfo } from "./MyVehicleRegistration";

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
  return (
    <>
      <Nav />
      <div css={outer}>
        <div css={content}>
          {/* 왼쪽 컨텐츠 */}
          <SaleCarImg />
          {/* 오른쪽 컨텐츠*/}
          <SaleInfoArea />
        </div>
      </div>
    </>
  );
}

export default SaleRegistration;
