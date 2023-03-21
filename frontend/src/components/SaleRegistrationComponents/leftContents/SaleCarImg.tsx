/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Carousel } from "react-responsive-carousel";
import car from "../../../assets/car.png";

const leftContent = css`
  width: 40vw;
  height: 90vh;
  margin-right: 6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

function SaleCarImg() {
  return (
    <div css={leftContent}>
      <Carousel>
        <div>
          <img src={car} alt="qwe" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={car} />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={car} />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
}

export default SaleCarImg;
