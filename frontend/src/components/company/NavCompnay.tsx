/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from 'react';
import { logoutSuccessAction } from './../../modules/takeLoginLogoutModule';

const container = css`
  width: 100%;
  height: 11.5vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  position: relative;

  .loginInfo {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: end;
    color: white;
    height: 30px;

    div {
      margin: 5px 20px 0 20px;
      font-weight: 500;
      font-size: 20px;
    }
  }

  .menu {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    div {
      margin-bottom: 10px;
    }
    .logo {
      border: 1px solid white;
      height: 60px;
      width: 60px;
      margin-left: 20px;
    }
    .logo2 {
      color: white;
      font-size: 35px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default function NavGarage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");

  // 다른 nav로
  const ObjString: any = localStorage.getItem("login-token");

  // 로그인 되면, 아이디 보여주기
  useEffect(() => {
    if (!ObjString) navigate("/");
    setName(JSON.parse(ObjString).userId);
  }, [ObjString]);

  // 로그아웃
  const handleLogout = () => {
    dispatch(logoutSuccessAction());
  };

  const isLoggedIn = useSelector((state: any) => state.LoginOutReducer.success);

  useEffect(() => {
    console.log(isLoggedIn)
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleClick = () => {
    navigate("/garage");
  };

  return (
    <div css={container}>
      <div className="menu">
        <div
          className="logo2"
          onClick={handleClick}
          css={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="logo"
            width="180px"
            height="auto"
            css={{ margin: "20px 0 0 80px" }}
          />
        </div>
        <div
          className="loginInfo"
          css={{ cursor: "default", marginRight: "20px" }}
        >
          <div onClick={handleLogout}>
            {name}님 환영합니다
          </div>
          <div
            css={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}
