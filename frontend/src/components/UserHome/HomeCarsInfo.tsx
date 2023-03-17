/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import carsImg from "../../assets/cars.png";
import engineerImg from "../../assets/engineer.png";
import transactionImg from "../../assets/transection.png";
import gumsuImg from "../../assets/gumsu.png";

const container = css`
  display: flex;
  align-items: center;
  height: auto;
  position: relative;
  flex-direction: column;

  .header {
    height: auto;
    width: 70vw;
    text-align: center;
    position: relative;
    p:nth-of-type(1) {
      font-size: 25px;
      font-weight: bold;
    }
  }

  .desciprtion {
    height: auto;
    display: flex;
    justify-content: center;
  }

  .card {
    text-align: center;
    width: 30vw;
    height: 8vw;
    margin: 1.5vw 1.5vw 1.5vw 1.5vw;
    border: 1px solid black;
  }

  .cardDetail {
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 5vw;
    height: 5vw;
  }
`;

export default function HomeCarsInfo() {
  return (
    <div css={container}>
      <div className="header">
        <p>차량 거래 및 관련 파트너사 정보</p>
        <hr />
        <p>
          우리 회사를 방문해주셔서 감사합니다. 저희는 항상 사용자 중심의
          서비스를 제공하며, 사용자들의 요구에 부응하여 지속적으로 서비스를
          개선하고 있습니다. 저희와 함께 안전하고 편리한 중고차 거래를
          경험해보세요.
        </p>
      </div>
      <div className="desciprtion">
        <div className="cards">
          <div className="card">
            <div>The number of vehicles</div>
            <div className="cardDetail">
              <img src={carsImg} />
              <p>숫자</p>
            </div>
          </div>
          <div className="card">
            <div>The number of vehicles</div>
            <div className="cardDetail">
              <img src={transactionImg} />
              <p>숫자</p>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div>The number of vehicles</div>
            <div className="cardDetail">
              <img src={engineerImg} />
              <p>숫자</p>
            </div>
          </div>
          <div className="card">
            <div>The number of vehicles</div>
            <div className="cardDetail">
              <img src={gumsuImg} />
              <p>숫자</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
