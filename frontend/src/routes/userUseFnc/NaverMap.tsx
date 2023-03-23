import { useEffect, useRef } from "react";
import { getCurrentLocation } from "../../components/NaverMap/MapFunction";
import Nav from "./../../components/Nav";

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

function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCurrentLocation(좌표, mapRef);
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        style={{
          width: "100vw",
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
        onClick={() => getCurrentLocation(좌표, mapRef)}
      >
        +
      </button>
    </>
  );
}
export default NaverMap;
