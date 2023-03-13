/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import HomeCarModel from "../components/UserHome/HomeCarModel";
import HomeIconMenu from "../components/UserHome/HomeIconMenu";
import HomeMainMenu from "../components/UserHome/HomeMainMenu";

export default function UserHome() {
  return (
    <>
      <HomeCarModel />
      <HomeIconMenu />
      <HomeMainMenu />
    </>
  );
}
