/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";

const leftContent = css`
  width: 15vw;
  margin-left: 10%;
`;

const leftOuter = css`
  height: 16%;
  width: 20vw;
  position: sticky;
  top: 56%;
  left: 5%;
  border: 1px #b1b1b1 solid;
`;

function MenuBar() {
  return (
    <div css={leftContent}>
      <div css={leftOuter}>
        <SearchBar />
        <SearchFilter />
      </div>
    </div>
  );
}

export default MenuBar;
