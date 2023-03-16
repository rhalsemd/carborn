/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
const container = css`
  height: 80vh;
  width: 100vw;
  border: 1px solid black;
  .header {
    height: 10vh;
    width: 100%;
    display: flex;
    justify-content: center;
    p {
      margin: 20px 0 px 0;
      font-size: 25px;
      font-weight: bolder;
    }
  }
  .elements {
    height: 75vh;
    width: 100%;
    border: 1px solid black;
  }
  hr {
    width: 50%;
    height: 3px;
    background-color: black;
  }
`;

export default function HomeWhyCooseUs() {
  return (
    <div css={container}>
      <div className="header">
        <p>왜 카본을 선택해야 하는가?</p>
      </div>
      <hr />
      <div className="elements"></div>
    </div>
  );
}
