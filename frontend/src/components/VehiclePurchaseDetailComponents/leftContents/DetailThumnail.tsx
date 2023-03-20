/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useQuery, useQueryClient } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loading from "../../Loading";

const leftContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 80vh;
  margin-right: 6vw;
`;

// 에러 컴포넌트
const DetailThumnailContentFallback = ({ error }: any) => {
  const queryClient = useQueryClient();

  return (
    <div>
      <p> 에러: {error.message} </p>
      <button onClick={() => queryClient.refetchQueries("car-detail")}>
        {" "}
        다시 시도{" "}
      </button>
    </div>
  );
};

function DetailThumnailContent() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueriesData("car-detail");
  console.log(data);
  return (
    <div css={leftContent}>
      <img src="" alt="Thumnail" width="100%" height="20%" />
    </div>
  );
}

function DetailThumnail() {
  return (
    <ErrorBoundary FallbackComponent={DetailThumnailContentFallback}>
      <Suspense fallback={<Loading />}>
        <DetailThumnailContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default DetailThumnail;
