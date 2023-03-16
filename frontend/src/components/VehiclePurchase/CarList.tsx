/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import carImg from "../../assets/car.png";

const rightContent = css`
  border: 1px solid black;
  width: 80vw;
  height: 90vh;
  display: flex;
  justify-content: center;

  .btn {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 50px;
    height: 10px;
  }
`;

const infoBox = css`
  border: 1px solid black;
  width: 95%;
  height: 40%;
  margin-top: 3%;
  display: flex;
  align-items: center;
  position: relative;
`;

const imgStyle = css`
  height: 80%;
  width: 30%;
  margin-left: 2%;
  margin-right: 2%;
`;

const textStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-right: 2%;
  justify-content: space-around;
`;

function CarList() {
  return (
    <div css={rightContent}>
      <div css={infoBox}>
        <button className="btn">asdf</button>
        <img src={carImg} alt="carImg" css={imgStyle} />

        <div css={textStyle}>
          <div>
            <div>2016 아반떼 | 120,000km</div>
            <div style={{ border: "2px solid black", width: "5%" }}></div>
          </div>

          <div>
            2019년에 구입하여 정말 애지중지 해서 관리한 차 입니다. 사고난적 한
            번 없고 엔진오일, 타이어 제때 갈아줘서 상태가 좋습니다.
          </div>
          <div>16,000,000,000￦</div>
        </div>
      </div>
    </div>
  );
}

export default CarList;
