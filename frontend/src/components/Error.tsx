import { useQueryClient } from "react-query";

// 에러 컴포넌트
const DetailInfomationFallback = ({ error, key }: any) => {
  const queryClient = useQueryClient();

  return (
    <div>
      <p> 에러: {error.message} </p>
      <button onClick={() => queryClient.refetchQueries(key)}>
        {" "}
        다시 시도{" "}
      </button>
    </div>
  );
};

export default DetailInfomationFallback;
