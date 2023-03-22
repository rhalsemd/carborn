import { useEffect, useRef, useState } from "react";
import hand from "../../assets/hand.png";

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
];

const getCurrentLocation = (): any => {
  const options = {
    enableHighAccuracy: true,
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    },
    null,
    options
  );
};

const naver = window.naver;

interface LocationType {
  lat: string;
  lng: string;
}

function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(
    null
  );

  useEffect(() => {
    setCurrentLocation(getCurrentLocation());
    console.log(getCurrentLocation());
    console.log(currentLocation);

    const center = new naver.maps.LatLng(
      currentLocation?.lat,
      currentLocation?.lng
    );

    var markers: any[] = [],
      infoWindows: any[] = [];
    // 네이버 맵 생성
    const mapDiv = mapRef.current;
    const map = new naver.maps.Map(mapDiv, {
      center,
      zoom: 17,
    });

    // 인포 마커
    좌표.forEach((key) => {
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
        content:
          '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"' +
          '"</b>.</div>',
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
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        style={{ width: "100vw", height: "100vh", position: "relative" }}
      />
      <button
        style={{
          position: "fixed",
          zIndex: 100,
          bottom: "14%",
          right: "0.8%",
        }}
        onClick={() => setCurrentLocation(getCurrentLocation())}
      >
        +
      </button>
    </>
  );
}
export default NaverMap;
