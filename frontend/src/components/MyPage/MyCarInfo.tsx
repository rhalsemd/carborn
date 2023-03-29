import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./../Nav";
import styled from "@emotion/styled";
import MyCarDataComponent from "./TableComponent/MyCarDataComponent";

// 캐러셀 CSS
const StyleMyCarInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MyCarInfo = () => {
  return (
    <>
      <Nav />
      {/* 이거 클릭하면, 차량 판매등록 페이지로 가기 */}
      <Link to="/">
        <button>판매 등록</button>
      </Link>
      {/* 이거 클릭하면, 차량 내차등록 페이지로 가기 */}
      <Link to="/">
        <button>내차 등록</button>
      </Link>
      <StyleMyCarInfoContainer>
        <MyCarDataComponent />
      </StyleMyCarInfoContainer>
    </>
  );
};

export default MyCarInfo;
