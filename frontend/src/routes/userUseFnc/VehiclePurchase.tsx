/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import CarList from "../../components/VehiclePurchase/rightContents/CarList";
import MenuBar from "../../components/VehiclePurchase/leftContents/MenuBar";
import SearchSort from "../../components/VehiclePurchase/SearchSort";
import { SearchType } from "../../components/VehiclePurchase/VehiclePurchaseType";
import { useState } from "react";
import Nav from "../../components/Nav";

const outer = css`
  width: 100%;
  display: flefx;
  justify-content: center;
  flex-direction: column;
  height: auto;
`;

const filter = css`
  width: 96vw;
  height: 5vh;
  display: flex;
  flex-direction: row-reverse;
  margin: 0 0 2vh 0;
`;

const content = css`
  display: flex;
  align-items: center;
`;

function VehiclePurchase() {
  const [searchInfo, setSearchInfo] = useState<SearchType>({
    sort: "",
  });
  return (
    <>
      <Nav />

      <div css={outer}>
        <div css={filter}>
          {/* 정렬바 */}
          <SearchSort setSearchInfo={setSearchInfo} />
        </div>
        <div css={content}>
          {/* 왼쪽 메뉴바 */}
          <MenuBar />
          {/* 오른쪽 컨텐츠 */}
          <CarList />
        </div>
      </div>
    </>
  );
}

export default VehiclePurchase;
