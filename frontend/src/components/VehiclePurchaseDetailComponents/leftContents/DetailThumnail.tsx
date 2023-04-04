/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Suspense } from "react";
import Loading from "../../Loading";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import car from "../../../assets/car.png";

const leftContent = css`
  width: 30vw;
  height: 50%;
  margin-right: 6vw;

  .slider {
    display: flex;
    align-items: center;
    height: auto;
  }

  .carousel-slider {
    .slider-wrapper {
      height: 80vh;
      width: 30vw;
    }
  }
  .carousel {
    .thumbs-wrapper {
      margin: 0;
      padding: 0;
    }
  }
  .no-img {
    text-align: center;
    margin-top: 50%;
  }
`;

function DetailThumnailContent({ img }: { img: any[] }) {
  return (
    <div css={leftContent}>
      {img?.length ? (
        <Carousel>
          {img?.map((img) => {
            return (
              <div style={{ height: "50%" }}>
                <img
                  src={car}
                  alt="qwe"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            );
          })}
        </Carousel>
      ) : (
        <div className="no-img">
          <h2>사진을 올려 주세요.</h2>
        </div>
      )}
    </div>
  );
}

function DetailThumnail({ img }: { img: any[] }) {
  return (
    <Suspense fallback={<Loading />}>
      <DetailThumnailContent img={img} />
    </Suspense>
  );
}

export default DetailThumnail;
