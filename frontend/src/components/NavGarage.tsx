/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  width: 100vw;
  height: 13.5vh;
  background-color: black;
  display: flex;
  flex-direction: column;

  .loginInfo {
    text-align: end;
  }

  .menu {
  }
`;

export default function NavGarage() {
  return (
    <div css={container}>
      <div className="loginInfo">현재 비</div>
      <div className="menu"></div>
    </div>
  );
}
