/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useAPI } from "./../../hooks/useAPI";
import carForSaleImg from "../../assets/carForSaleImg.jpg";

interface 임시type {
  url: string;
  year: number;
  car: string;
  price: number;
}

const container = css`
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  background-image: url(${carForSaleImg});
  background-size: cover;
  background-position: 0 60%;
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
    width: 5vw;
  }
`;

const header = css`
  display: flex;
  flex-direction: column;
  height: 18vh;
  align-items: center;
  /* margin-top: 70px; */
  color: white;
  p:nth-of-type(1) {
    margin: 7vh 0 0 0;
  }
  p:nth-of-type(2) {
    margin: 0 0 0 0;
    font-size: 30px;
    font-weight: bold;
  }
`;

const imgBox = css`
  width: 65vw;
  height: 55vh;
  position: relative;
  overflow: hidden;
  padding: 0 10px 0 10px;

  &:hover {
    transition: all 0.3s;

    .Btn {
      display: inline;
      transition: all 0.3s;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bolder;
      border: 1px solid #a8a8a8;
    }

    .leftBtn {
      transform: translateX(-10px);
      transition: all 0.3s;
    }
    .rightBtn {
      right: 0;
      transition: all 0.3s;
    }
  }
  .Btn {
    color: red;
    border: 1px solid #a8a8a8;
    background-color: #f6f6f6;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    top: 45%;
    position: absolute;
    z-index: 2;
    opacity: 0;
    transition: all 0.3s;
  }
  .leftBtn {
    transform: translateX(30px);
  }
  .rightBtn {
    right: 30px;
  }

  .img {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    margin: 0 10px 0 10px;
    height: 80%;
    width: 30%;
    border: none;

    .imgUrl {
      flex: 3;
    }
    .year {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1.2;
      background-color: #202223;
      color: white;
      font-size: 20px;
      hr {
        background-color: white;
        border: none;
        height: 1px;
      }
      hr:nth-last-of-type(2) {
        margin-top: 15px;
      }
      hr:nth-last-of-type(1) {
      }
    }
    .car {
      flex: 0.8;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #202223;
      color: white;
      font-size: 25px;
      transform: translateY(-10px);
    }
  }
`;

const 임시data: 임시type[] = [
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
    price: 1000000,
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
    price: 1000000,
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
    price: 1000000,
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
    price: 1000000,
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
    price: 1000000,
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
    price: 1000000,
  },
  {
    url: "url",
    year: 2013,
    car: "아우디 A8",
    price: 1000000,
  },
];

export default function HomeCarForSales() {
  const URL = "http://carborn.site/api/repair-shop/result/${id}";
  const getCarForSale = useAPI("get", "");
  const { data } = useQuery("getCarForSale");
  const len = 임시data.length;
  const imgWidth = window.innerWidth * 0.15125;
  const [x, setX] = useState<number>(0);

  const cars = css`
    transition: all ease 80ms 0s;
    display: flex;
    height: 100%;
    width: 80%;
    align-items: center;
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
        <div className="Btn rightBtn" onClick={moveRight}>
          <p>&#10095;</p>
        </div>
        <div className="Btn leftBtn" onClick={moveLeft}>
          <p>&#10094;</p>
        </div>
        <div css={cars} ref={carsRef}>
          {임시data.map((data: 임시type, idx: number): any => (
            <div className="img" key={idx}>
              <div className="imgUrl">{data.url}</div>
              <div className="year">
                {`${data.year} ${data.car}`}
                <hr />
                <hr />
              </div>
              <div className="car">{data.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
