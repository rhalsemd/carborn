/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

const roadView = css`
  width: 100%;
  height: 30vh;
  background-color: red;
`;

const naver = window.naver;

// 파노라마 옵션
var panoramaOptions = {
  position: new naver.maps.LatLng(37.565525, 126.976915),
  // size: new naver.maps.Size(310, 350),
  pov: {
    pan: -75,
    tilt: 10,
    fov: 100,
  },
};

interface Props {
  setReserve: React.Dispatch<React.SetStateAction<boolean>>;
  setMarkerNum: React.Dispatch<React.SetStateAction<number>>;
  searchInfoWindows: any;
  markerNum: number;
}

function MarkerDetail({
  setReserve,
  setMarkerNum,
  searchInfoWindows,
  markerNum,
}: Props) {
  // 파노라마 생성 태그
  const roadViewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 파노라마 생성
    if (roadViewRef.current) {
      var pano = new naver.maps.Panorama(roadViewRef.current, panoramaOptions);
    }
  }, []);

  // 나가기 버튼 클릭
  const exit = () => {
    setReserve(false);
    setMarkerNum(-1);
    searchInfoWindows[markerNum].close();
  };

  return (
    <div
      style={{
        marginBottom: "5vh",
        backgroundColor: "white",
      }}
    >
      <CloseIcon
        style={{ margin: "0 0 3% 92.5%", cursor: "pointer" }}
        onClick={exit}
      />
      <div css={roadView} ref={roadViewRef}></div>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "0",
          fontWeight: "bolder",
        }}
      >
        정비소
      </p>
      <p
        style={{
          marginTop: "0",
          color: "#E00000",
          fontWeight: "bolder",
        }}
      >
        3.9
        <span>★★★★☆</span>
        <span style={{ color: "#BBBBBB", fontSize: "0.9rem" }}> 리뷰 15</span>
      </p>
      <p
        style={{
          marginBottom: "0",
          color: "#606060",
          fontSize: "0.9rem",
        }}
      >
        경북 구미시 구미중앙로 76
      </p>
      <p
        style={{
          margin: "0",
          color: "#C1C1C1",
          fontSize: "0.9rem",
        }}
      >
        (우) 39301 (지번) 원평동 1008-1
      </p>
      <p
        style={{
          marginTop: "0",
          color: "#038400",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        1234-5678
      </p>
      <div>
        <div
          style={{
            width: "99%",
            height: "4vh",
            border: "1px solid #C1C1C1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "500",
            fontSize: "1.2rem",
            color: "#606060",
            margin: "0 0 5% 0",
          }}
        >
          리뷰
        </div>
        <div style={{}}>
          <div>fsd</div>
          <div>fsd</div>
          <div>fsd</div>
          <div>fsd</div>
          <div>fsd</div>
          <div>fsd</div>
          <div>fsd</div>
          <div>fsd</div>
          <div>fsd</div>
          <div>fsd</div>
        </div>
      </div>
    </div>
  );
}

export default MarkerDetail;
