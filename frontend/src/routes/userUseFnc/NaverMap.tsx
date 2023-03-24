/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef } from "react";

import { useState } from "react";
import hand from "../../assets/hand.png";
import CurrentLocationBtn from "../../components/NaverMap/CurrentLocationBtn";
import SearchBar from "../../components/NaverMap/SearchBar";

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

const naver = window.naver;

// geolocation 옵션
const options = {
  enableHighAccuracy: true,
};

function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  var markers: any[] = [],
    infoWindows: any[] = [];
  const [searchMarkers, setSearchMarkers] = useState<any[]>([]);
  const [searchInfoWindows, setSearchInfoWindows] = useState<any[]>([]);

  const [mapObject, setMapObject] = useState<any>(null);

  /**
   * 현재 위치를 받는 함수
   */
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        drawingMap(lat, lng);
      },
      null,
      options
    );
  };

  /**
   * 지도를 그리는 함수
   */
  const drawingMap = (lat: number, lng: number) => {
    // const center = new naver.maps.LatLng(lat, lng);
    const center = new naver.maps.LatLng(37.565525, 126.976915);

    // 네이버 맵 생성
    const mapDiv = mapRef.current;
    const map = new naver.maps.Map(mapDiv, {
      center,
      zoom: 17,
    });
    setMapObject(map);

    setMarker(map);
  };

  /**
   * 마커 생성 함수
   */
  const setMarker = (map: any) => {
    좌표.forEach((key: any) => {
      var position = new naver.maps.LatLng(key.lat, key.lng);
      var marker = new naver.maps.Marker({
        map: map,
        position,
        icon: {
          url: hand,
          size: new naver.maps.Size(50, 52),
          scaledSize: new naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
        },
        zIndex: 100,
      });

      var infoWindow = new naver.maps.InfoWindow({
        content: [
          '<div style="width:28vw; padding:10px; height: 28vh; margin-left:2.5vw;">',
          '<p style="font-size: 1.5rem; margin-bottom: 0; margin-top: 0; font-weight: bolder;">정비소</p>',
          '<p style="margin-top: 0; color: #E00000; font-weight: bolder;">',
          "3.9<span>★★★★☆</span>",
          '<span style="color: #BBBBBB; font-size: 0.9rem; "> 리뷰 15</span>',
          "</p>",
          '<p style="margin-bottom: 0; color: #606060; font-size: 0.9rem">경북 구미시 구미중앙로 76</p>',
          '<p style="margin: 0; color: #C1C1C1; font-size: 0.9rem">(우) 39301 (지번) 원평동 1008-1</p>',
          '<p style="margin-top: 0; color: #038400; font-size: 1rem; font-weight: bold;">1234-5678</p>',
          `<button class="fix-shop" style="background-color: red; width: 90%; height: 22%; border-radius: 10px; border: 0; font-size: 1rem; font-weight: bolder; color: white; cursor: pointer;">예약하기</button>`,
          "</div>",
        ].join(""),
      });

      const button = infoWindow.getContentElement().childNodes[5];
      button.addEventListener("click", () => {
        console.log("클릭");
      });

      markers.push(marker);
      infoWindows.push(infoWindow);
      setSearchMarkers((mark) => {
        return [...mark, marker];
      });
      setSearchInfoWindows((info) => {
        return [...info, infoWindow];
      });
    });

    naver.maps.Event.addListener(map, "idle", function () {
      updateMarkers(map, markers);
    });

    function updateMarkers(map: any, markers: any) {
      var mapBounds = map.getBounds();
      var marker: any, position;
      let newMarker: any[] = [];

      for (var i = 0; i < markers.length; i++) {
        marker = markers[i];
        position = marker.getPosition();

        if (mapBounds.hasLatLng(position)) {
          showMarker(map, marker);
        } else {
          hideMarker(map, marker);
        }

        if (marker.map) {
          newMarker[newMarker.length] = marker;
        }
        setSearchMarkers(newMarker);
      }
    }

    function showMarker(map: any, marker: any) {
      if (marker.getMap()) return;
      marker.setMap(map);
    }

    function hideMarker(map: any, marker: any) {
      if (!marker.getMap()) return;
      marker.setMap(null);
    }

    function getClickHandler(seq: number) {
      return function () {
        var marker = markers[seq],
          infoWindow = infoWindows[seq];

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      };
    }

    for (var i = 0, ii = markers.length; i < ii; i++) {
      naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const searchBarItemClick = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (searchInfoWindows.length && searchMarkers.length) {
      if (searchInfoWindows[index].getMap()) {
        searchInfoWindows[index].close();
      } else {
        searchInfoWindows[index].open(mapObject, searchMarkers[index]);
      }
    }
  };

  return (
    <>
      <div css={container}>
        <div css={searchBar}>
          <div css={searchResult}>
            {searchMarkers.map((item, index) => {
              return (
                <SearchBar
                  key={index}
                  index={index}
                  searchBarItemClick={searchBarItemClick}
                />
              );
            })}
          </div>
        </div>
        <CurrentLocationBtn
          mapRef={mapRef}
          getCurrentLocation={getCurrentLocation}
        />
      </div>
    </>
  );
}
export default NaverMap;
