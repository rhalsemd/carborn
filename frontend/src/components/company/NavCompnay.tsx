/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useEffect, useState } from "react";

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
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const ObjString: any = localStorage.getItem("login-token");
  useEffect(() => {
    if (!ObjString) navigate("/");
    setName(JSON.parse(ObjString).userId);
  }, [ObjString]);

  const handleLogout = () => {
    localStorage.removeItem("login-token");
    navigate("/");
  };
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
          <div>{name}님 환영합니다</div>
          <div css={{ cursor: "pointer" }} onClick={handleLogout}>
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
}
