/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  height: 71.5vh;
  width: 100%;
  border: 1px solid black;
`;

export default function CarModel() {
  return (
    <div css={container}>
      <h1>CarModel</h1>
    </div>
  );
}
