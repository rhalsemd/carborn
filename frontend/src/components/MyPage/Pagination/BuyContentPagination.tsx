import axios from "axios";
import { API_URL } from './../../../lib/api';
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

export interface BuySellContentPaginationProps {
  itemsPerPage: number;
}

export interface Car {
  model: string;
  number: string;
  mileage: string;
  year: string;
  registrationDate?: string;
  status: boolean;
  sellprice?: string;
  buyprice?: string;
}

const StyleBuyContentPaginationDiv = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BuyContentPagination = ({
  itemsPerPage,
}: BuySellContentPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [buyData, setBuyData] = useState<Car[]>([]);
  const totalPages = Math.ceil(buyData.length / itemsPerPage);

  const handleRequestBuyData = async (page: number, count: number) => {
    try {
      // const response = await axios.get(`${API_URL}/buycontent/${page}/${count}`);
      const response = await axios.get(`${API_URL}/buycontent`);
      setBuyData(response.data);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRequestBuyData(currentPage, itemsPerPage);
  }, []);

  // 페이지 네이션 유효성 검사
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = buyData.slice(startIndex, endIndex);

  if (buyData.length === 0) {
    return <div>No data Found!</div>;
  }

  return (
    <StyleBuyContentPaginationDiv>
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            <th>차량번호</th>
            <th>{`주행 거리(km)`}</th>
            <th>{`연식(년)`}</th>
            <th>구매가</th>
            <th>상태</th>
            <th>{"구매 완료일"}</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((car: Car, index: number) => (
            <tr key={index}>
              <td>{car.model}</td>
              <td>{car.number}</td>
              <td>{car.mileage}</td>
              <td>{car.year}</td>
              <td>{car.buyprice}</td>
              <td>{car.status ? `구매 완료` : `예약 중`}</td>
              <td>{car.registrationDate ? car.registrationDate : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handleRequestBuyData(currentPage - 1, itemsPerPage)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          if (i >= currentPage + 2 || i <= currentPage - 2) return null;
          return (
            <button
              key={i}
              disabled={currentPage === i + 1}
              onClick={() => handleRequestBuyData(i + 1, itemsPerPage)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleRequestBuyData(currentPage + 1, itemsPerPage)}
        >
          Next
        </button>
      </div>
    </StyleBuyContentPaginationDiv>
  );
};

export default BuyContentPagination;
