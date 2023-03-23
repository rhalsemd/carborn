/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NavCompany from "../../components/company/NavCompnay";
import RegisterForm from "../../components/company/garage/RegisterForm";
import car from "../../assets/giup-car.png";

const container = css`
  width: 100%;
  height: 88.5vh;
  background-color: black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .backImg {
    height: 75%;
    width: 75%;
    opacity: 0.6;
    position: absolute;
    z-index: 0;
  }
`;

export default function Register() {
  return (
    <>
      <NavCompany />
      <div css={container}>
        <img src={car} className="backImg" />
        <RegisterForm />
      </div>
    </>
  );
}
