/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import CarList from "../../components/VehiclePurchase/CarList";
import MenuBar from "../../components/VehiclePurchase/MenuBar";

const outer = css`
  border: 1px solid black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const filter = css`
  width: 96vw;
  height: 5vh;
  display: flex;
  flex-direction: row-reverse;
  margin-right: 4vw;
  margin-bottom: 2vh;
`;

const content = css`
  display: flex;
  align-items: center;
`;

function VehiclePurchase() {
  return (
    <div css={outer}>
      <div css={filter}>
        <h2>필터</h2>
      </div>
      <div css={content}>
        {/* 왼쪽 메뉴바 */}
        <MenuBar />
        {/* 오른쪽 컨텐츠 */}
        <CarList />
      </div>
    </div>
  );
}

export default VehiclePurchase;
