/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import handImg from "../../assets/hand.png";
import safeImg from "../../assets/safe.png";
import searchImg from "../../assets/search.png";
import communityImg from "../../assets/community.png";
import checkImg from "../../assets/check.png";
import chainImg from "../../assets/chain.png";

interface DataType {
  url: any;
  descripton: string;
}

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  width: 100%;
  border: 1px solid black;
  .header {
    height: 10vh;
    width: 100%;
    display: flex;
    justify-content: center;
    p {
      margin: 20px 0 px 0;
      font-size: 25px;
      font-weight: bolder;
    }
  }
  .elements {
    height: auto;
    width: 80%;
  }
  .section {
    display: flex;
    height: 30vh;
    width: 100%;
  }
  .card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    border: 1px solid black;
    padding: 0 15px 0 15px;
  }
  img {
    height: 7vw;
    width: 7vw;
    margin-bottom: 10px;
    position: relative;
  }
  hr {
    width: 50%;
    height: 3px;
    background-color: black;
  }
`;

const datas1: DataType[] = [
  {
    url: handImg,
    descripton:
      "중개업체나 안전 거래 보호 서비스를 제공하여 거래의 안정성을 높일 수 있습니다.",
  },
  {
    url: searchImg,
    descripton:
      "원하는 차종, 가격대 등의 조건을 설정하여 최적의 차량을 선택할 수 있습니다.",
  },
  {
    url: checkImg,
    descripton:
      "판매 중인 차량의 상세 정보, 가격 정보, 사고 이력 등을 쉽게 확인할 수 있습니다.",
  },
];
const datas2: DataType[] = [
  {
    url: communityImg,
    descripton:
      "커뮤니티를 통해 다른 사용자와 공유하고, 원하는 정보를 얻을 수 있습니다.",
  },
  {
    url: chainImg,
    descripton:
      "블록체인 기술을 활용하여 거래 과정의 투명성으로 언제나 공개될 수 있습니다.",
  },
  {
    url: safeImg,
    descripton: "인증된 차량만 거래하도록 규정하고 있습니다.",
  },
];

export default function HomeWhyCooseUs() {
  return (
    <div css={container}>
      <div className="header">
        <p>왜 카본을 선택해야 하는가?</p>
      </div>
      <hr />
      <div className="elements">
        <div className="section">
          {datas1.map((ele: DataType, idx: number): any => (
            <div className="card" key={idx}>
              <img src={ele.url} />
              {ele.descripton}
            </div>
          ))}
        </div>
        <div className="section">
          {datas2.map((ele: DataType, idx: number): any => (
            <div className="card" key={idx}>
              <img src={ele.url} />
              <p>{ele.descripton}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
