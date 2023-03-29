/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import carBackground from "../assets/carBackground2.jpg";
import { useNavigate } from "react-router-dom";

const container = css`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  .section1 {
    width: 100%;
    height: 4vh;
    background-color: black;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    .loginInfo {
      display: flex;
      justify-content: end;
      height: 100%;
      width: 80%;
      background-color: black;
      color: white;
      div {
        margin: 0 20px;
      }
    }
  }
  .section2 {
    width: 80%;
    height: 45vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.8);
    background-image: url(${carBackground});

    .menuBar {
      width: 80%;
      height: 13.5vh;
      display: flex;
      color: white;
      .logo {
        flex: 4;
        display: flex;
        align-items: center;
      }
      .menu {
        font-size: 20px;

        font-weight: 550;
        flex: 6;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
      }
      .item {
        cursor: pointer;
      }
    }
    .location {
      position: relative;
      align-self: baseline;
      color: white;
      font-size: 40px;
      font-weight: bolder;
      margin-bottom: 10px;
    }
  }
`;

export default function Nav2() {
  const navigate = useNavigate();
  return (
    <div css={container}>
      <div className="section1">
        <div className="loginInfo">
          <div>로그인이 필요합니다.</div>
          <div>login</div>
        </div>
      </div>
      <div className="section2">
        <div className="menuBar">
          <div className="logo" onClick={(): void => navigate("/")}>
            로고임
          </div>
          <div className="menu">
            <div className="item" onClick={(): void => navigate("/")}>
              구매
            </div>
            <div className="item" onClick={(): void => navigate("/")}>
              판매
            </div>
            <div className="item" onClick={(): void => navigate("/")}>
              커뮤니티
            </div>
            <div className="item" onClick={(): void => navigate("/")}>
              검수 및 정비 예약
            </div>
            <div className="item" onClick={(): void => navigate("/")}>
              MY CAR
            </div>
          </div>
        </div>
        <div className="location">여기는 어디?</div>
      </div>
    </div>
  );
}
