/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const leftContent = css`
  border: 1px solid black;
  width: 15vw;
  height: 90vh;
  margin-right: 1vw;
`;

function MenuBar() {
  return (
    <div css={leftContent}>
      <h1>메뉴바</h1>
    </div>
  );
}

export default MenuBar;
