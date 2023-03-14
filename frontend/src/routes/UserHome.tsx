/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { positions } from "@mui/system";
import HomeCarModel from "../components/UserHome/HomeCarModel";
import HomeIconMenu from "../components/UserHome/HomeIconMenu";
import HomeMainMenu from "../components/UserHome/HomeMainMenu";
import HomeCarForSales from "../components/UserHome/HomeCarForSales";

const container = css`
  position: absolute;
  top: 13.5vh;
`;

export default function UserHome() {
  return (
    <div css={container}>
      <HomeCarModel />
      <HomeIconMenu />
      <HomeMainMenu />
      <HomeCarForSales />
    </div>
  );
}
