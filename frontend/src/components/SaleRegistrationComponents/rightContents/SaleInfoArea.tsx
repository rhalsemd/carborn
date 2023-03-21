/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ErrorComponent from "./../../ErrorComponent";
import { Loading } from "./../../Loading";
import { useAPI } from "./../../../hooks/useAPI";
import { useQuery } from "react-query";
import { useState } from "react";
import SaleManufacturingCompany from "./SaleManufacturingCompany";
import SaleCarNumber from "./SaleCarNumber";
import SaleCarYear from "./SaleCarYear";
import SaleDistanceDriven from "./SaleDistanceDriven";

const rightContent = css`
  width: 40vw;
  height: 90vh;
`;
const API = `https://jsonplaceholder.typicode.com/todos/1`;

function SaleInfoContents({
  setError,
}: {
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
}) {
  const getCarInfo = useAPI("get", API);
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
      <SaleDistanceDriven />
      {/* 추가 제출 파일 */}
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
