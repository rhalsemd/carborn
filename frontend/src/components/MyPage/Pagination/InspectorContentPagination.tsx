import axios from "axios";
import { API_URL, CARBORN_SITE } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export interface InspectorContentPaginationProps {
  itemsPerPage: number;
}

export interface Car {
  id: number;
  carModelNm: string;
  manufacturer: string;
  carMileage: number;
  carRegNm: string;
  carModelYear: string;
  price: number;
  bookDt: string;
  lastMaintenanceDate: string;
  bookStatus: string;
  inspectorAccountName: string;
}

const StyleInspectorPaginationDiv = styled.div`
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
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestInspectorData = async (page: number, count: number) => {
    try {
      const response = await axios.get(`${CARBORN_SITE}/api/user/inspect/book/list/${page}/${count}`);
      setTotalPageCnt(response.data.message.totalPages);
      
      const modifiedContent = response.data.message.content.map((content: any) => {
        let modifiedBookStatus = '';
        let modifiedBookStatusNum = 0;
        switch (content.bookStatus) {
          case 0:
            modifiedBookStatus = '예약 중';
            modifiedBookStatusNum = 0;
            break;
          case 1:
            modifiedBookStatus = '검수 완료';
            modifiedBookStatusNum = 1;
            break;
          case 2:
            modifiedBookStatus = '예약 취소';
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
  
      setInspectorData(modifiedContent);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };
  
  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestInspectorData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (inspectorData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getInspectorBookDetail = (carId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/inspector/${carId}/bookdetail`);
    }
  };
  
  const getInspectorDetail = (resultId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/inspector/${resultId}/completedetail`, {
        state: inspectorData[resultId % 5],
      });
    }
  };
  

  return (
    <StyleInspectorPaginationDiv>
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            {/* <th>제조사</th> */}
            <th>{`주행거리(km)`}</th>
            <th>차량번호</th>
            <th>{`연식(년)`}</th>
            <th>검수예약신청일</th>
            {/* <th>검수완료일</th> */}
            <th>검수상태</th>
            <th>검수업체</th>
            <th>예약상세조회</th>
            <th>완료상세조회</th>
          </tr>
        </thead>
        <tbody>
          {inspectorData.map((car: Car, index: number) => (
            <tr key={index}>
              <td>{car.carModelNm}</td>
              {/* <td>{car.manufacturer}</td> */}
              <td>{car.carMileage}</td>
              <td>{car.carRegNm}</td>
              <td>{car.carModelYear}</td>
              <td>
                {car.bookDt === null ? "-" : car.bookDt}
              </td>
              {/* <td>
                {car.lastMaintenanceDate === null
                  ? "-"
                  : car.lastMaintenanceDate}
              </td> */}
              <td>{car.bookStatus}</td>
              <td>{car.inspectorAccountName}</td>
              {/* <td>
                {car.maintenanceCompany === null ? "-" : car.maintenanceCompany}
              </td> */}
              <td>
                <button onClick={() => getInspectorBookDetail(car.id)}>
                  조회
                </button>
              </td>
              <td>
                <button onClick={() => getInspectorDetail(car.id)}>
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
          onClick={() => handleRequestInspectorData(currentPage - 1, itemsPerPage)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          if (i >= currentPage + 2 || i <= currentPage - 2) return null;
          return (
            <button
              key={i}
              disabled={currentPage === i + 1}
              onClick={() => handleRequestInspectorData(i + 1, itemsPerPage)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleRequestInspectorData(currentPage + 1, itemsPerPage)}
        >
          Next
        </button>
      </div>
    </StyleInspectorPaginationDiv>
  );
};

export default InspectorContentPagination;

