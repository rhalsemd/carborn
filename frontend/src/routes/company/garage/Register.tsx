/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NavGarage from "../../../components/NavGarage";
import RegisterForm from "../../../components/garage/RegisterForm";
import car from "../../../assets/giup-car.png";

const container = css`
  width: 100%;
  height: 88.5vh;
  background-color: black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
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
      <NavGarage />
      <div css={container}>
        <img src={car} />
        <RegisterForm />
      </div>
    </>
  );
}
