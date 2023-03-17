/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const container = css`
  height: 100vh;
  width: 100%;
  display: flex;
  border: 1px solid black;
  flex-direction: column;

  .menu {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;
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
  align-items: center;
  flex-direction: column;
  p {
    margin: 0;
    padding: 0;
  }
  .rectangleBtns {
    flex-direction: row;
    margin-bottom: 5vh;
    padding: 0;
  }
  .rectangleBtn {
    height: 50vh;
    width: 20vw;
    margin: 0 20px 0 20px;
    padding: 0;
    /* flex-direction: column; */
  }
  .squareBtns {
    flex-direction: row;
    margin: 0;
    padding: 0;
  }
  .squareBtn {
    height: 28vh;
    width: 20vw;
    margin: 0 20px 0 20px;
  }
`;

interface btns {
  icon: string;
  name: string;
  description: string;
}

type btnType = btns[];

export default function HomeMainMenu() {
  const rectangles: btnType = [
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
      description: "다양한 사람들과 함께 내 차를 공유해 보asdfasdf세요",
    },
  ];

  const squares: btnType = [
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
      description: "다양한 사람들과 함께 내 차를 공유해 보asdfasdf세요",
    },
  ];

  return (
    <div css={container}>
      <div className="menu">
        <h2>Menu</h2>
        <hr />
      </div>
      <div css={buttons}>
        <div className="rectangleBtns">
          {rectangles.map((rect: btns, idx: number): any => (
            <button className="rectangleBtn" key={idx}>
              <div>{rect.icon}</div>
              <div>{rect.name}</div>
              <div>{rect.description}</div>
            </button>
          ))}
        </div>
        <div className="squareBtns">
          {squares.map((rect: btns, idx: number): any => (
            <button className="squareBtn" key={idx}>
              <p>{rect.icon}</p>
              <p>{rect.name}</p>
              <p>{rect.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
