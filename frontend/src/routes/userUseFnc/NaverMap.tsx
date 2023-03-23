/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef } from "react";
import {
  drawingMap,
  getCurrentLocation,
} from "../../components/NaverMap/MapFunction";
import { useState } from "react";

const container = css`
  display: flex;
`;

const searchBar = css`
  background-color: white;
  width: 27vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const searchResult = css`
  background-color: #ffffff;
  width: 90%;
  height: 100%;
`;

const 좌표 = [
  {
    lat: 37.565525,
    lng: 126.976915,
  },
  {
    lat: 37.563551,
    lng: 126.976926,
  },
  {
    lat: 37.565636,
    lng: 126.977328,
  },
  {
    lat: 37.565364,
    lng: 126.977339,
  },
  {
    lat: 37.565564,
    lng: 126.977339,
  },
];

function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  // var markers: any[] = [],
  //   infoWindows: any[] = [];
  const [markers, setMarkers] = useState<any>([]);
  const [infoWindows, setInfoWindows] = useState<any>([]);

  const [mapObject, setMapObject] = useState<any>(null);

  useEffect(() => {
    getCurrentLocation(
      좌표,
      mapRef,
      markers,
      setMarkers,
      infoWindows,
      setInfoWindows,
      setMapObject
    );
  }, []);

  const searchBarItemClick = (index: number) => {
    console.log(infoWindows);
    if (infoWindows.length && markers.length) {
      if (infoWindows[index].getMap()) {
        infoWindows[index].close();
      } else {
        infoWindows[index].open(mapObject, markers[index]);
      }
    }
  };

  return (
    <>
      <div css={container}>
        <div css={searchBar}>
          <div css={searchResult}>
            {좌표.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    transform: "translate(10%,0)",
                    marginBottom: "5vh",
                    cursor: "pointer",
                  }}
                  onClick={() => searchBarItemClick(index)}
                >
                  <p
                    style={{
                      fontSize: "1.5rem",
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
                    <span style={{ color: "#BBBBBB", fontSize: "0.9rem" }}>
                      {" "}
                      리뷰 15
                    </span>
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
                  <div
                    style={{
                      border: "0.8px solid #C1C1C1",
                      opacity: "0.3",
                      width: "80%",
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div
            ref={mapRef}
            style={{
              width: "74vw",
              height: "100vh",
            }}
          />
          <button
            style={{
              position: "fixed",
              zIndex: 100,
              bottom: "14%",
              right: "0.8%",
            }}
            onClick={() =>
              getCurrentLocation(
                좌표,
                mapRef,
                markers,
                setMarkers,
                infoWindows,
                setInfoWindows,
                setMapObject
              )
            }
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
export default NaverMap;
