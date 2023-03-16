/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";

interface 임시type {
  url: string;
  year: number;
  car: string;
}

const container = css`
  height: 70vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  hr {
    background-color: #d23131;
    height: 2px;
  }
  hr:nth-of-type(1) {
    width: 10vw;
    margin-bottom: 2px;
    margin-top: 0px;
  }

  hr:nth-of-type(2) {
    /* margin-top: 2px; */
    width: 5vw;
  }
`;

const header = css`
  display: flex;
  flex-direction: column;
  height: 18vh;
  align-items: center;

  p:nth-of-type(1) {
    margin: 7vh 0 0 0;
    /* font-size: 25px; */
    /* font-weight: bold; */
  }
  p:nth-of-type(2) {
    margin: 0 0 0 0;
    font-size: 25px;
    font-weight: bold;
  }
`;

const imgBox = css`
  width: 65vw;
  height: 55vh;
  /* border: 1px solid black; */
  /* margin-top: ; */
  position: relative;
  overflow: hidden;
  padding: 0 10px 0 10px;
  .Btn {
    height: 50px;
    width: 50px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    top: 45%;
    position: absolute;
    z-index: 2;
  }
  .leftBtn {
    transform: translateX(-10px);
  }
  .rightBtn {
    right: 0;
  }

  .img {
    flex: 0 0 auto;
    margin: 0 10px 0 10px;
    height: 80%;
    width: 30%;
    border: 1px solid black;
  }
`;

const 임시data: 임시type[] = [
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
  },
];

export default function HomeCarForSales() {
  const len = 임시data.length;
  const imgWidth = window.innerWidth * 0.15125;
  const [x, setX] = useState<number>(0);
  const cars = css`
    transition: all ease 80ms 0s;
    display: flex;
    height: 100%;
    width: 80%;
    align-items: center;
    /* overflow-y: scroll; */
    flex-wrap: nowrap;
    transform: translateX(${x}px);
    &::-webkit-scrollbar {
      display: none;
    }
  `;
  const moveRight = (): void => {
    if (-x < (len - 3) * imgWidth) setX((prev) => prev - imgWidth);
  };
  const moveLeft = (): void => {
    if (x + imgWidth < 0) {
      setX((prev) => prev + imgWidth);
    } else setX(0);
  };
  const carsRef = useRef<HTMLDivElement>(null);
  return (
    <div css={container}>
      <div css={header}>
        <p>안전한 거래를 하세요</p>
        <p>최산 판매 등록 차량</p>
      </div>
      <hr />
      <hr />
      <div css={imgBox}>
        <button className="Btn rightBtn" onClick={moveRight}>
          {">"}
        </button>
        <button className="Btn leftBtn" onClick={moveLeft}>
          {"<"}
        </button>
        <div css={cars} ref={carsRef}>
          {임시data.map((data: 임시type, idx: number): any => (
            <div className="img" key={idx}>
              <p>{data.url}</p>
              <p>{data.year}</p>
              <p>{data.car}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
