/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import HomeCarModel from "../../components/UserHome/HomeCarModel";
import HomeIconMenu from "../../components/UserHome/HomeIconMenu";
import HomeMainMenu from "../../components/UserHome/HomeMainMenu";
import HomeCarForSales from "../../components/UserHome/HomeCarForSales";
import HomeWhyCooseUs from "../../components/UserHome/HomeWhyChooseUs";
import HomeCarsInfo from "../../components/UserHome/HomeCarsInfo";
import Nav from "../../components/Nav";

const container = css`
  position: absolute;
  top: 13.5vh;
`;

export default function UserHome() {
  return (
    <>
      <Nav />
      <div css={container}>
        <HomeCarModel />
        <HomeIconMenu />
        <HomeMainMenu />
        <HomeCarForSales />
        <HomeWhyCooseUs />
        <HomeCarsInfo />
      </div>
    </>
  );
}
