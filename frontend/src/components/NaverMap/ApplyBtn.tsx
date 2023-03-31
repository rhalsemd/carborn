import axios from "axios";
import { useMutation } from "react-query";
import { MarkerType } from "../../routes/userUseFnc/NaverMap";

function ApplyBtn({
  markerArr,
  markerNum,
}: {
  markerArr: MarkerType[];
  markerNum: number;
}) {
  const { mutate, isSuccess } = useMutation("apply-company", () => {
    return axios({
      method: "post",
      url: `https://carborn.site/api/user/${
        markerArr[markerNum].AUTH === 1 ? "repair" : "inspect"
      }/book`,
      data: {},
    });
  });

  const getApply = () => {
    mutate();
    console.log(isSuccess);
  };
  return (
    <>
      <button
        style={{
          backgroundColor: "red",
          width: "100%",
          height: "6vh",
          borderRadius: "10px",
          border: "0",
          fontSize: "1.1rem",
          fontWeight: "bolder",
          color: "white",
          cursor: "pointer",
          margin: "7% 0 0 0",
        }}
        onClick={getApply}
      >
        신청하기
      </button>
    </>
  );
}

export default ApplyBtn;
