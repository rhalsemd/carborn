/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useInfiniteQuery } from "react-query";
import carImg from "../../../assets/car.png";
import { useEffect, useRef } from "react";
import { Page } from "../VehiclePurchaseType";
import { infinityFnc } from "../VehiclePurchaseAPI";
import { useNavigate } from "react-router-dom";

const rightContent = css`
  width: 75vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8vw;
  .btn {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 65px;
    height: 20px;
    background-color: red;
    color: white;
    border-color: red;
    font-size: x-small;
  }
`;

const infoBox = css`
  width: 95%;
  background-color: beige;
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

let intersectionOptions = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 0.3,
};

function CarList() {
  const divRef = useRef<HTMLDivElement | any>({});
  const navigation = useNavigate();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infinity-scroll",
    infinityFnc,
    {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1;
      },
      onSuccess: (data) => {
        return data;
      },
    }
  );

  const intersection = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    });
  }, intersectionOptions);

  useEffect(() => {
    if (divRef?.current && data) {
      let lastPage = data.pages[0].data.length - 1;
      intersection.observe(divRef?.current[lastPage]);
    }
  }, [data]);

  const goToDetil: any = (id: number) => {
    navigation(`/user/car/${id}`);
  };

  return (
    <div css={rightContent}>
      {data?.pages.map((item) => {
        return item.data.map((page: Page, index: number) => {
          return (
            <div
              css={infoBox}
              key={index}
              ref={(ref) => (divRef.current[index] = ref)}
            >
              <button className="btn" onClick={() => goToDetil(page.id)}>
                Detail
              </button>
              <img src={carImg} alt="carImg" css={imgStyle} />
              <div css={textStyle}>
                <div>
                  <div>{page.name}</div>
                  <div style={{ border: "2px solid red", width: "3vw" }}></div>
                </div>

                <div>{page.name}</div>
                <div>{`${page.name}￦`}</div>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
}

export default CarList;
