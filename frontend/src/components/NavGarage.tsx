/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  width: 100%;
  height: 11.5vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  position: relative;

  .loginInfo {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    text-align: end;
    color: white;
    height: auto;

    div {
      margin: 5px 20px 0 20px;
      font-weight: 500;
      font-size: 15px;
    }
  }

  .menu {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    align-items: center;
    div {
      margin-bottom: 10px;
    }
    .logo {
      border: 1px solid white;
      height: 40px;
      width: 40px;
      margin-left: 20px;
    }
    .logo2 {
      color: white;
      font-size: 35px;
      font-weight: bold;
    }
  }
`;

export default function NavGarage() {
  return (
    <div css={container}>
      <div className="loginInfo">
        <div>현재 비로그인 상태입니다</div>
        <div>로그인</div>
      </div>
      <div className="menu">
        <div className="logo"></div>
        <div className="logo2">Car Bon</div>
      </div>
    </div>
  );
}
