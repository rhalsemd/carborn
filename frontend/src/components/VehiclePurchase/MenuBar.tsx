/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const leftContent = css`
  border: 1px solid black;
  width: 15vw;
  height: 90vh;
  margin: 0 1vw 0 2vw;
`;

function MenuBar() {
  return (
    <div css={leftContent}>
      <h1>메뉴바</h1>
    </div>
  );
}

export default MenuBar;
