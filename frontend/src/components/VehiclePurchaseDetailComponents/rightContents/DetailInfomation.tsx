/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const rightContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 90vh;
`;

function DetailInfomation() {
  return (
    <div css={rightContent}>
      <h2 style={{ textAlign: "center" }}>차량 등록</h2>
    </div>
  );
}

export default DetailInfomation;
