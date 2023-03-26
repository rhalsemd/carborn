import axios from "axios";
import { API_URL } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export interface InspectorContentPaginationProps {
  itemsPerPage: number;
}

export interface Car {
  id: number;
  model: string;
  manufacturer: string;
  mileage: number;
  plateNumber: string;
  year: number;
  price: number;
  maintenanceSchedule: string;
  lastMaintenanceDate: string;
  maintenanceStatus: string;
  maintenanceCompany: string;
}

const StyleBuyContentPaginationDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InspectorContentPagination = ({
  itemsPerPage,
}: InspectorContentPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [inspectorData, setInspectorData] = useState<Car[]>([]);
  const totalPages = Math.ceil(inspectorData.length / itemsPerPage);

  const handleRequestBuyData = async (page: number, count: number) => {
    try {
      const response = await axios.get(`${API_URL}/inspector`);
      setInspectorData(response.data);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;

  useEffect(() => {
    handleRequestBuyData(currentPage, itemsPerPage);
  }, [currentPage]);

  // 페이지 네이션 유효성 검사
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = inspectorData.slice(startIndex, endIndex);

  if (inspectorData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getInspectionDetail = (carId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/inspector/${carId}/completedetail`, {
        state: inspectorData[carId - 1] },
      );
    }
  };

  const getInspectionBookDetail = (carId:number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/inspector${carId}/bookdetail`)
    }
  }

  return (
    <StyleBuyContentPaginationDiv>
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            <th>제조사</th>
            <th>{`주행거리(km)`}</th>
            <th>차량번호</th>
            <th>{`연식(년)`}</th>
            <th>검수예약신청일</th>
            <th>검수완료일</th>
            <th>검수상태</th>
            <th>검수업체</th>
            <th>예약상세조회</th>
            <th>완료상세조회</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((car: Car, index: number) => (
            <tr key={index}>
              <td>{car.model}</td>
              <td>{car.manufacturer}</td>
              <td>{car.mileage}</td>
              <td>{car.plateNumber}</td>
              <td>{car.year}</td>
              <td>
                {car.maintenanceSchedule === null
                  ? "-"
                  : car.maintenanceSchedule}
              </td>
              <td>
                {car.lastMaintenanceDate === null
                  ? "-"
                  : car.lastMaintenanceDate}
              </td>
              <td>{car.maintenanceStatus}</td>
              <td>
                {car.maintenanceCompany === null ? "-" : car.maintenanceCompany}
              </td>
              <td>
                <button onClick={() => getInspectionBookDetail(car.id)}>
                  조회
                </button>
              </td>
              <td>
                <button onClick={() => getInspectionDetail(car.id)}>
                  조회
                </button>
              </td>
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

export default InspectorContentPagination;
