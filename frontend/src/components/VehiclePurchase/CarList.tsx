/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import carImg from "../../assets/car.png";
import { useEffect, useRef } from "react";

const rightContent = css`
  border: 1px solid black;
  width: 80vw;
  height: auto;
  display: flex;
  flex-direction: column;
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

const temporaryData = [
  {
    title: "2016 아반떼 | 120,000km",
    content: `2019년에 구입하여 정말 애지중지 해서 관리한 차 입니다. 사고난적 한
    번 없고 엔진오일, 타이어 제때 갈아줘서 상태가 좋습니다.`,
    price: "16,000,000,000￦",
  },
];

interface Page {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

interface PageParam {
  pageParam?: number;
}

function infinityFnc({ pageParam = 1 }: PageParam) {
  return axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/comments`,
    params: {
      postId: pageParam,
    },
  });
}

let intersectionOptions = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 0.3,
};

function CarList() {
  const divRef = useRef<HTMLDivElement | any>({});

  const { data, fetchNextPage, isRefetching } = useInfiniteQuery(
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
        fetchNextPage();
      }
    });
  }, intersectionOptions);

  useEffect(() => {
    if (divRef?.current && data) {
      let lastPage = data.pages[0].data.length - 1;
      intersection.observe(divRef?.current[lastPage]);
    }
  }, [data]);

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
              <button className="btn">{page.id}</button>
              <img src={carImg} alt="carImg" css={imgStyle} />
              <div css={textStyle}>
                <div>
                  <div>{page.name}</div>
                  <div style={{ border: "2px solid black", width: "5%" }}></div>
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
