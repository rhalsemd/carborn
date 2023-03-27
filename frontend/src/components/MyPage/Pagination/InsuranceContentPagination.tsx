import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "./../../../lib/api";
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
  const totalPages = Math.ceil(insuranceData.length / itemsPerPage);

  const handleRequestInsuranceData = async (page: number, count: number) => {
    try {
      const response = await axios.get(`${API_URL}/insurance`);
      setInsuranceData(response.data);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;

  useEffect(() => {
    handleRequestInsuranceData(currentPage, itemsPerPage);
  }, [currentPage]);

  // 페이지 네이션 유효성 검사
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = insuranceData.slice(startIndex, endIndex);

  if (insuranceData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getInsuranceDetail = (carId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/insurance/${carId}/completedetail`, {
        state: insuranceData[carId - 1],
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
          {currentItems.map((insurance: InsuranceType, index: number) => (
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
    </StyleInsurancePaginationDiv>
  );
};

export default InsuranceContentPagination;
