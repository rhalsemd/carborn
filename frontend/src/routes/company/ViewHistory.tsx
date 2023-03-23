/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NavGarage from "../../components/company/NavCompnay";
import car from "../../assets/giup-car.png";
import HistoryTable from "../../components/company/HistoryTable";
import { Suspense } from "react";

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
    /* align-self; */
    height: 75%;
    width: 75%;
    opacity: 0.6;
    position: absolute;
    z-index: 0;
  }
`;

export default function ViewHistory() {
  return (
    <>
      <NavGarage />
      <div css={container}>
        <img src={car} />
        <Suspense fallback={<>asdf</>}>
          <HistoryTable />
        </Suspense>
      </div>
    </>
  );
}
