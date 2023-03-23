import hand from "../../assets/hand.png";

const naver = window.naver;

/**
 * 지도를 그리는 함수
 * @param location : 정비소 or 검수원의 정보를 받는다.
 * @param lat : 위도
 * @param lng : 경도
 * @param mapRef : map을 그릴 div tag
 */
export const drawingMap = (
  location: any,
  lat: number,
  lng: number,
  mapRef: React.RefObject<HTMLDivElement>
) => {
  // const center = new naver.maps.LatLng(lat, lng);
  const center = new naver.maps.LatLng(37.565525, 126.976915);

  var markers: any[] = [],
    infoWindows: any[] = [];

  // 네이버 맵 생성
  const mapDiv = mapRef.current;
  const map = new naver.maps.Map(mapDiv, {
    center,
    zoom: 17,
  });

  setMarker(location, markers, infoWindows, map, "red");
};

/**
 * 마커 생성 함수
 * @param location : 정비소 or 검수원의 정보를 받는다.
 * @param markers : 마커를 저장하는 배열
 * @param infoWindows : info를 저장하는 배열
 * @param map : 네이버 map 객체를 받는다.
 * @param color :
 */
export const setMarker = (
  location: any,
  markers: any,
  infoWindows: any,
  map: any,
  color: any
) => {
  location.forEach((key: any) => {
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
        `<button class="fix-shop" style="background-color: ${color}; width: 90%; height: 22%; border-radius: 10px; border: 0; font-size: 1rem; font-weight: bolder; color: white; cursor: pointer;">예약하기</button>`,
        "</div>",
      ].join(""),
    });

    const button = infoWindow.getContentElement().childNodes[5];
    button.addEventListener("click", () => {
      console.log("클릭");
    });

    markers.push(marker);
    infoWindows.push(infoWindow);
  });

  naver.maps.Event.addListener(map, "idle", function () {
    updateMarkers(map, markers);
  });

  function updateMarkers(map: any, markers: any) {
    var mapBounds = map.getBounds();
    var marker, position;

    for (var i = 0; i < markers.length; i++) {
      marker = markers[i];
      position = marker.getPosition();

      if (mapBounds.hasLatLng(position)) {
        showMarker(map, marker);
      } else {
        hideMarker(map, marker);
      }
    }
  }
  function showMarker(map: any, marker: any) {
    if (marker.setMap()) return;
    marker.setMap(map);
  }

  function hideMarker(map: any, marker: any) {
    if (!marker.setMap()) return;
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

const options = {
  enableHighAccuracy: true,
};

/**
 * 현재 위치를 받는 함수
 * @param location : 정비소 or 검수원의 정보를 받는다.
 * @param mapRef : map을 그릴 div 태그
 */
export const getCurrentLocation = (
  location: any,
  mapRef: React.RefObject<HTMLDivElement>
) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      drawingMap(location, lat, lng, mapRef);
    },
    null,
    options
  );
};
