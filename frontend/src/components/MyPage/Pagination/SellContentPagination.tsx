import styled from "@emotion/styled";
import { useState } from "react";
import { BuySellContentPaginationProps } from "./BuyContentPagination";
import { CARBORN_SITE } from "./../../../lib/api";
import axios from "axios";
import { useEffect } from "react";


export interface SellContentType {
  carModel: string;
  manufacturer: string;
  plateNumber: string;
  year: string;
  mileage: number;
  price: number;
  reservationDate: null | string;
  completedDate: null | string;
  salesStatus: string;
  buyer: string;
}

const StyleSellContentPaginationDiv = styled.div`
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SellContentPagination = ({
  itemsPerPage,
}: BuySellContentPaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sellData, setSellData] = useState<SellContentType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestSellData = async (page: number, count: number) => {
    try {
      const response = await axios.get(`${CARBORN_SITE}/buycontent/${page}/${count}`);
      // setTotalPageCnt(response.data.message.totalPages);

      const modifiedContent = response.data.message.content.map((content: any) => {
        let modifiedBookStatus = '';
        let modifiedBookStatusNum = 0;
        switch (content.bookStatus) {
          case 0:
            modifiedBookStatus = '예약 중';
            modifiedBookStatusNum = 0;
            break;
          case 1:
            modifiedBookStatus = '판매 완료';
            modifiedBookStatusNum = 1;
            break;
          case 2:
            modifiedBookStatus = '판매 취소';
            modifiedBookStatusNum = 2;
            break;
          default:
            modifiedBookStatus = content.bookStatus;
            modifiedBookStatusNum = 0;
            break
        }
  
        return {
          ...content,
          bookStatus: modifiedBookStatus,
          modifiedBookStatusNum,
        };
      });

      setSellData(modifiedContent);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestSellData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (sellData.length === 0) {
    return <div>No data Found!</div>;
  }

  return (
    <StyleSellContentPaginationDiv>
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            <th>제조사</th>
            <th>차량번호</th>
            <th>{`연식(년)`}</th>
            <th>{`주행거리(km)`}</th>
            <th>{`구매가(만원)`}</th>
            <th>판매 예약 신청일</th>
            <th>판매 완료일</th>
            <th>판매상태</th>
            <th>구매자</th>
          </tr>
        </thead>
        <tbody>
          {sellData.map(
            (sell: SellContentType, index: number) => (
              <tr key={index}>
                <td>{sell.carModel}</td>
                <td>{sell.manufacturer}</td>
                <td>{sell.plateNumber}</td>
                <td>{sell.year}</td>
                <td>{sell.mileage}</td>
                <td>{sell.price}</td>
                <td>
                  {sell.reservationDate === null ? "-" : sell.reservationDate}
                </td>
                <td>
                  {sell.completedDate === null ? "-" : sell.completedDate}
                </td>
                <td>{sell.salesStatus}</td>
                <td>{sell.buyer === null ? "-" : sell.buyer}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handleRequestSellData(currentPage - 1, itemsPerPage)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          if (i >= currentPage + 2 || i <= currentPage - 2) return null;
          return (
            <button
              key={i}
              disabled={currentPage === i + 1}
              onClick={() => handleRequestSellData(i + 1, itemsPerPage)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleRequestSellData(currentPage + 1, itemsPerPage)}
        >
          Next
        </button>
      </div>
    </StyleSellContentPaginationDiv>
  );
};

export default SellContentPagination;
