/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery, useMutation } from "react-query";

import SaleManufacturingCompany from "./SaleManufacturingCompany";
import SaleCarNumber from "./SaleCarNumber";
import SaleCarYear from "./SaleCarYear";
import SaleDistanceDriven from "./SaleDistanceDriven";
import SaleCarCost from "./SaleCarCost";
import SaleCarContent from "./SaleCarContent";

import ErrorComponent from "./../../ErrorComponent";
import { Loading } from "./../../Loading";
import { useAPI } from "./../../../hooks/useAPI";
import axios from "axios";

const rightContent = css`
  width: 40vw;
  height: 90vh;
`;

export interface SaleInfoType {
  distance: string;
  cost: string;
  content: string;
}

export interface SaleInfoContentsType {
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setSaleInfo: React.Dispatch<React.SetStateAction<SaleInfoType>>;
  saleInfo: SaleInfoType;
}

const GET_API = `https://jsonplaceholder.typicode.com/todos/1`;
const POST_API = `https://jsonplaceholder.typicode.com/todos/12`;

function SaleInfoContents({
  setError,
}: Pick<SaleInfoContentsType, "setError">) {
  const [saleInfo, setSaleInfo] = useState<SaleInfoType>({
    distance: "",
    cost: "",
    content: "",
  });

  const getCarInfo = useAPI("get", GET_API);

  // 자동차 정보를 받아오는 query
  const { data } = useQuery("get-car-info", () => getCarInfo, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data;
    },
    onError: (error: Error) => {
      setError(error);
    },
    suspense: true,
    useErrorBoundary: true,
  });

  // 제출할 때 실행되는 query
  const { mutate } = useMutation(() =>
    axios({
      method: "post",
      url: POST_API,
      data: {
        saleInfo,
      },
    })
  );

  const submitInfo = () => {
    mutate();
  };

  return (
    <div css={rightContent}>
      <h2 style={{ textAlign: "center" }}>차량 판매 등록</h2>
      <hr />
      {/* 제조사 / 차량모델 */}
      <SaleManufacturingCompany />
      {/* 차량번호 */}
      <SaleCarNumber />
      {/* 연식 */}
      <SaleCarYear />
      {/* 주행거리 */}
      <SaleDistanceDriven setSaleInfo={setSaleInfo} />
      {/* 차량 가격 */}
      <SaleCarCost setSaleInfo={setSaleInfo} />
      {/* 판매내용 */}
      <SaleCarContent setSaleInfo={setSaleInfo} />
      {/* 제출 버튼 */}
      <button onClick={submitInfo}>제출</button>
    </div>
  );
}

function SaleInfoArea() {
  const [error, setError] = useState<Error | null>(null);

  return (
    <ErrorBoundary
      fallback={<ErrorComponent error={error} queryKey={"get-car-info"} />}
    >
      <Suspense fallback={<Loading />}>
        <SaleInfoContents setError={setError} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default SaleInfoArea;
