//MUI 컴포넌트
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL, CARBORN_SITE } from "./../../../lib/api";
import { useEffect } from "react";

export interface InsuranceContentPaginationProps {
  itemsPerPage: number;
}

export interface InsuranceType {
  id: number;
  carModel: string;
  manufacturer: string;
  mileage: number;
  plateNumber: string;
  year: number;
  insuranceType: number;
  insuranceProcessedDate: string;
  registrationDate: string;
  insuranceCompany: string;
}

const StyleInsurancePaginationDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InsuranceContentPagination = ({
  itemsPerPage,
}: InsuranceContentPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [insuranceData, setInsuranceData] = useState<InsuranceType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestInsuranceData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/insurance/result/list/${page}`
      );
      // setTotalPageCnt(response.data.message.totalPages);
        
      const modifiedContent = response.data.message.content.map(
        (content: any) => {
          let modifiedBookStatus = "";
          let modifiedBookStatusNum = 0;
          switch (content.insuranceBookBookStatus) {
            case 0:
              modifiedBookStatus = "예약 중";
              modifiedBookStatusNum = 0;
              break;
            case 1:
              modifiedBookStatus = "정비 완료";
              modifiedBookStatusNum = 1;
              break;
            case 2:
              modifiedBookStatus = "예약 취소";
              modifiedBookStatusNum = 2;
              break;
            default:
              modifiedBookStatus = content.insuranceBookBookStatus;
              modifiedBookStatusNum = 0;
              break;
          }

          return {
            ...content,
            insuranceBookBookStatus: modifiedBookStatus,
            modifiedBookStatusNum,
          };
        }
      );
    
      setInsuranceData(modifiedContent);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestInsuranceData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  // 페이지 네이션 유효성 검사
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = insuranceData.slice(startIndex, endIndex);

  if (insuranceData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getInsuranceDetail = (resultId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/insurance/${resultId}/completedetail`, {
        state: insuranceData[resultId % 5],
      });
    }
  };

  return (
    <StyleInsurancePaginationDiv>
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            <th>제조사</th>
            <th>{`주행거리(km)`}</th>
            <th>차량번호</th>
            <th>{`연식(년)`}</th>
            <th>보험종류</th>
            <th>보험처리일자</th>
            <th>내역등록일자</th>
            <th>보험사명</th>
            <th>완료상세조회</th>
          </tr>
        </thead>
        <tbody>
          {insuranceData.map((insurance: InsuranceType, index: number) => (
            <tr key={index}>
              <td>{insurance.carModel}</td>
              <td>{insurance.manufacturer}</td>
              <td>{insurance.mileage}</td>
              <td>{insurance.plateNumber}</td>
              <td>{insurance.year}</td>
              <td>{insurance.insuranceType}</td>
              <td>
                {insurance.insuranceProcessedDate === null
                  ? "-"
                  : insurance.insuranceProcessedDate}
              </td>
              <td>
                {insurance.registrationDate === null
                  ? "-"
                  : insurance.registrationDate}
              </td>
              <td>{insurance.insuranceCompany}</td>
              <td>
                <button onClick={() => getInsuranceDetail(insurance.id)}>
                  상세조회
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() =>
            handleRequestInsuranceData(currentPage - 1, itemsPerPage)
          }
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          if (i >= currentPage + 2 || i <= currentPage - 2) return null;
          return (
            <button
              key={i}
              disabled={currentPage === i + 1}
              onClick={() => handleRequestInsuranceData(i + 1, itemsPerPage)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            handleRequestInsuranceData(currentPage + 1, itemsPerPage)
          }
        >
          Next
        </button>
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            color="primary"
            onChange={(event, page) =>
              handleRequestInsuranceData(page, itemsPerPage)
            }
          />
        </Stack>
      </div>
    </StyleInsurancePaginationDiv>
  );
};

export default InsuranceContentPagination;

// 페이지네이션 컴포넌트 
export const BasicPagination = () => {
  return (
    <Stack spacing={2}>
      <Pagination count={10} color="primary" />
    </Stack>
  );
}