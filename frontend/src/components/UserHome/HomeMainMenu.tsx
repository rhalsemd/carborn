/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  height: 100vh;
  width: 100vw;
  display: flex;
  border: 1px solid black;
  flex-direction: column;

  .menu {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .menu > h3 {
    margin-top: 5%;
    margin-bottom: 8px;
    /* font-weight: bolder; */
  }
  .menu > hr {
    width: 50%;
    background-color: #d23131;
    height: 2px;
  }
`;

const buttons = css`
  display: flex;
  .rectangleBtn {
    height: 40vh;
    width: 24vw;
  }
`;

const squareBtn = css`
  height: 20vh;
  width: 24vw;
`;

interface Test {
  icon: string;
  name: string;
  description: string;
}

type Test2 = Test[];

export default function HomeMainMenu() {
  const rectangles: Test2 = [
    {
      icon: "icon",
      name: "사기",
      description: "블록체인으로 기록되는 안전한 거래를 이용해 보세요!",
    },
    {
      icon: "icon",
      name: "팔기",
      description: "블록체인으로 기록되는 안전한 거래를 이용해 보세요!",
    },
    {
      icon: "icon",
      name: "커뮤니티",
      description: "다양한 사람들과 함께 내 차를 공유해 보세요",
    },
  ];
  return (
    <div css={container}>
      <div>
        <div className="menu">
          <h3>Menu</h3>
          <hr />
        </div>
        <div css={buttons}>
          {rectangles.map((rect: Test, idx: number): any => (
            <button className="rectangleBtn">
              {rect.icon}
              {rect.name}
              {rect.description}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
