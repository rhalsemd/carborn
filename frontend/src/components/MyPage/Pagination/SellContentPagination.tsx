import styled from '@emotion/styled';
import { useState } from 'react';
import { BuySellContentPaginationProps, Car } from './BuyContentPagination';
import { API_URL } from './../../../lib/loginApi';
import axios from 'axios';
import { useEffect } from 'react';

const StyleSellContentPaginationDiv = styled.div`
  width: 100vw;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SellContentPagination = ({itemsPerPage}: BuySellContentPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sellData, setSellData] = useState<Car[]>([]);
  const totalPages = Math.ceil(sellData.length / itemsPerPage);

  const handleRequestSellData = async (page: number, count: number) => {
    try {
      // const response = await axios.get(`${API_URL}/buycontent/${page}/${count}`);
      const response = await axios.get(`${API_URL}/sellcontent`);
      setSellData(response.data);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRequestSellData(currentPage, itemsPerPage);
  }, []);

  // 페이지네이션 유효성 검사
  const startIndex = (currentPage -1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sellData.slice(startIndex, endIndex);
  
  return (
    <StyleSellContentPaginationDiv>
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            <th>차량번호</th>
            <th>{`주행 거리(km)`}</th>
            <th>{`연식(년)`}</th>
            <th>판매가</th>
            <th>상태</th>
            <th>{'구매 완료일'}</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((car: Car, index: number) => (
            <tr key={index}>
              <td>{car.model}</td>
              <td>{car.number}</td>
              <td>{car.mileage}</td>
              <td>{car.year}</td>
              <td>{car.sellprice}</td>
              <td>{car.status ? `판매 완료` : `예약 중`}</td>
              <td>{car.registrationDate ? car.registrationDate : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handleRequestSellData(currentPage - 1, itemsPerPage)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages}, (_, i) => {
          if ( i>= currentPage + 2 || i <= currentPage - 2) return null;
          return (
            <button
              key={i}
              disabled={currentPage === i+1}
              onClick={() => handleRequestSellData(i + 1, itemsPerPage)}
            >
              {i + 1}
            </button>
          )
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleRequestSellData(currentPage + 1, itemsPerPage)}
        >
          Next
        </button>
      </div>
    </StyleSellContentPaginationDiv>
  )
}

export default SellContentPagination;