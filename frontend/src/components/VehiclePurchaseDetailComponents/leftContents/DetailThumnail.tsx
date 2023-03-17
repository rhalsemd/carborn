/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const leftContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 90vh;
  margin-right: 6vw;
`;

function DetailThumnail() {
  return (
    <div css={leftContent}>
      <img src="" alt="Thumnail" width="100%" height="20%" />
    </div>
  );
}

export default DetailThumnail;
