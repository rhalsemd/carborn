import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { CARBORN_SITE } from "./../../../lib/api";
import { useEffect } from "react";

export interface RepairContentPaginationProps {
  itemsPerPage: number;
}

export interface RepairType {
  id: number;
  repairBookCarModelNm: string;
  manufacturer: string;
  mileage: number;
  repairBookCarRegNm: string;
  repairBookCarModelYear: number;
  price: number;
  repairDt: string;
  lastMaintenanceDate: string;
  repairBookBookStatus: string;
  repairBookAccountName: string;
}

const StyleRepairPaginationDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RepairContentPagination = ({
  itemsPerPage,
}: RepairContentPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [repairData, setRepairData] = useState<RepairType[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestRepairData = async (page: number, count: number) => {
    try {
      const response = await axios.get(
        `${CARBORN_SITE}/api/user/repair/result/list/${page}`
      );
      setTotalPageCnt(response.data.message.totalPages);
      const modifiedContent = response.data.message.content.map(
        (content: any) => {
          let modifiedBookStatus = "";
          let modifiedBookStatusNum = 0;
          switch (content.repairBookBookStatus) {
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
              modifiedBookStatus = content.repairBookBookStatus;
              modifiedBookStatusNum = 0;
              break;
          }

          return {
            ...content,
            repairBookBookStatus: modifiedBookStatus,
            modifiedBookStatusNum,
          };
        }
      );

      setRepairData(modifiedContent);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestRepairData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if (repairData.length === 0) {
    return <div>No data Found!</div>;
  }

  const getRepairBookDetail = (bookId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/repair/${bookId}/bookdetail`);
    }
  };

  const getRepairDetail = (resultId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/repair/${resultId}/completedetail`, {
        state: repairData[resultId % 5],
      });
    }
  };

  return (
    <StyleRepairPaginationDiv>
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            {/* <th>제조사</th> */}
            <th>{`주행거리(km)`}</th>
            <th>차량번호</th>
            <th>{`연식(년)`}</th>
            <th>정비예약신청일</th>
            {/* <th>정비완료일</th> */}
            <th>정비상태</th>
            <th>정비업체</th>
            <th>예약상세조회</th>
            <th>완료상세조회</th>
          </tr>
        </thead>
        <tbody>
          {repairData.map((car: RepairType, index: number) => (
            <tr key={index}>
              <td>{car.repairBookCarModelNm}</td>
              {/* <td>{car.manufacturer}</td> */}
              <td>{car.mileage}</td>
              <td>{car.repairBookCarRegNm}</td>
              <td>{car.repairBookCarModelYear}</td>
              <td>{car.repairDt === null ? "-" : car.repairDt}</td>
              {/* <td>
                {car.lastMaintenanceDate === null
                  ? "-"
                  : car.lastMaintenanceDate}
              </td> */}
              <td>{car.repairBookBookStatus}</td>
              <td>{car.repairBookAccountName}</td>
              {/* <td>
                {car.maintenanceCompany === null ? "-" : car.maintenanceCompany}
              </td> */}
              <td>
                <button onClick={() => getRepairBookDetail(car.id)}>
                  조회
                </button>
              </td>
              <td>
                <button onClick={() => getRepairDetail(car.id)}>조회</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handleRequestRepairData(currentPage - 1, itemsPerPage)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          if (i >= currentPage + 2 || i <= currentPage - 2) return null;
          return (
            <button
              key={i}
              disabled={currentPage === i + 1}
              onClick={() => handleRequestRepairData(i + 1, itemsPerPage)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleRequestRepairData(currentPage + 1, itemsPerPage)}
        >
          Next
        </button>
      </div>
    </StyleRepairPaginationDiv>
  );
};

export default RepairContentPagination;

