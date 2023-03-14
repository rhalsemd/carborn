/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  height: 60vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const header = css`
  display: flex;
  flex-direction: column;
  height: 18vh;
  align-items: center;

  hr {
    width: 40vw;
  }
  h1 {
    margin: 20px 0 10px;
  }
`;
export default function HomeCarForSales() {
  return (
    <div css={container}>
      <div css={header}>
        <h1>최산 판매 등록 차량</h1>
        <h4>안전한 거래를 하세요</h4>
        <hr />
        <hr />
      </div>
    </div>
  );
}
