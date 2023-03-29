import axios from "axios";
import { API_URL, CARBORN_SITE } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

export interface BuySellContentPaginationProps {
  itemsPerPage: number;
}

export interface BuyContentType {
  carModel: string;
  manufacturer: string;
  plateNumber: string;
  year: number;
  mileage: number;
  purchasePrice: number;
  reservationDate: string;
  purchaseDate: string;
  purchaseStatus: string;
  seller: string;
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
  const [buyData, setBuyData] = useState<BuyContentType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestBuyData = async (page: number, count: number) => {
    try {
      const response = await axios.get(`${CARBORN_SITE}/buycontent/${page}/${count}`);
      // const response = await axios.get(`${API_URL}/buycontent`);
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
            modifiedBookStatus = '구매 완료';
            modifiedBookStatusNum = 1;
            break;
          case 2:
            modifiedBookStatus = '구매 취소';
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

      setBuyData(modifiedContent);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestBuyData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (buyData.length === 0) {
    return <div>No data Found!</div>;
  }

  return (
    <StyleBuyContentPaginationDiv>
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            <th>제조사</th>
            <th>차량번호</th>
            <th>{`연식(년)`}</th>
            <th>{`주행거리(km)`}</th>
            <th>{`구매가(만원)`}</th>
            <th>구매 예약 신청일</th>
            <th>구매 완료일</th>
            <th>구매상태</th>
            <th>판매자</th>
          </tr>
        </thead>
        <tbody>
          {buyData.map((buy: BuyContentType, index: number) => (
            <tr key={index}>
              <td>{buy.carModel}</td>
              <td>{buy.manufacturer}</td>
              <td>{buy.plateNumber}</td>
              <td>{buy.year}</td>
              <td>{buy.mileage}</td>
              <td>{buy.purchasePrice}</td>
              <td>
                {buy.reservationDate === null ? "-" : buy.reservationDate}
              </td>
              <td>{buy.purchaseDate === null ? "-" : buy.purchaseDate}</td>
              <td>{buy.purchaseStatus}</td>
              <td>{buy.seller}</td>
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
