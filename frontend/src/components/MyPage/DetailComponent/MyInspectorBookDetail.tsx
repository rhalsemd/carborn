import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./../../../lib/api";
import Nav from "./../../Nav";

const StyleMyInspectorBookDetailContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleMyBookDetailTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40vw;
  height: 20vh;
  border-bottom: 3px solid red;

  span {
    font-size: 2.5rem;
    font-weight: 900;
  }
`;

const StyleMyBookDetailTable = styled.table`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const StyleMyBookDetailPaginationButton = styled.div`
  margin-bottom: 5rem;
`;

export interface bookDetailType {
  id: number;
  model: string;
  manufacturer: string;
  registrationNumber: string;
  year: number;
  mileage: number;
  price: number;
  reservationDate: number;
}

const MyInspectorBookDetail = () => {
  const itemsPerPage = 5;

  // 검수
  const [inspectorBookData, setInspectorBookData] = useState<any[]>([]);
  const [currentInspectorPage, setCurrentInspectorPage] = useState(1);
  const [isInspectorBookChange, setIsInspectorBookChange] =
    useState<boolean>(false);
  const [isInspectorBookDelete, setIsInspectorBookDelete] =
    useState<boolean>(false);
  const [isInspectorBookid, setIsInspectorBookid] = useState<string | number>(
    0
  );
  const totalInspectorPages = Math.ceil(
    inspectorBookData.length / itemsPerPage
  );

  // 검수
  const handleInspectorPaging = async (page: number, count: number) => {
    try {
      const response = await axios.get(`${API_URL}/myinspectorbook`);
      setInspectorBookData(response.data);
      setCurrentInspectorPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  // 페이지 네이션 유효성 검사(검수)
  const startInspectorIndex = (currentInspectorPage - 1) * itemsPerPage;
  const endInspectorIndex = startInspectorIndex + itemsPerPage;
  const currentInspectorItems = inspectorBookData.slice(
    startInspectorIndex,
    endInspectorIndex
  );

  // 정비, 검수
  useEffect(() => {
    handleInspectorPaging(currentInspectorPage, itemsPerPage);
  }, [currentInspectorPage]);

  // 데이터 없을때
  if (inspectorBookData.length === 0) {
    return <div>No data Found!</div>;
  }

  // 예약 변경 모달 나오게하기(검수)
  const handleInspectorBookChange = (id: number) => {
    setIsInspectorBookChange(true);
    setIsInspectorBookid(id);
  };

  // 예약 취소 모달 나오게 하기(검수)
  const handleInspectorBookDelete = (id:number) => {
    setIsInspectorBookDelete(true);
    setIsInspectorBookid(id);
  }

  // 모달창 닫을 때
  const handleCloseModal = () => {
    setIsInspectorBookChange(false);
    setIsInspectorBookDelete(false);
  };

  // 예약 변경 로직 구현
  const handleReservationChange = async (id: string | number, newDate: string) => {
    try {
      const response = await axios.put(`API_ENDPOINT/${id}`, {
        reservationDate: newDate,
      });
      console.log(response.data); // 변경된 예약 정보 확인
      // 변경된 예약 정보를 반영하는 로직 구현
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyleMyInspectorBookDetailContainer>
      <Nav />
      <StyleMyBookDetailTitleDiv>
        <span>검수 예약 리스트</span>
      </StyleMyBookDetailTitleDiv>
      <StyleMyBookDetailTable>
        <thead>
          <tr>
            <th>차량모델</th>
            <th>제조사</th>
            <th>차량번호</th>
            <th>연식</th>
            <th>{`주행거리(km)`}</th>
            <th>차량가격</th>
            <th>예약신청일자</th>
            <th>예약변경신청</th>
            <th>예약취소신청</th>
          </tr>
        </thead>
        <tbody>
          {currentInspectorItems.map((data: bookDetailType, index: number) => (
            <tr key={index}>
              <td>{data.model}</td>
              <td>{data.manufacturer}</td>
              <td>{data.registrationNumber}</td>
              <td>{data.year}</td>
              <td>{data.mileage}</td>
              <td>{data.price}</td>
              <td>{data.reservationDate}</td>
              <td>
                <button onClick={() => handleInspectorBookChange(data.id)}>
                  변경하기
                </button>
              </td>
              <td>
                <button onClick={() => handleInspectorBookDelete(data.id)}>
                  취소하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyleMyBookDetailTable>
      <StyleMyBookDetailPaginationButton>
        <button
          disabled={currentInspectorPage === 1}
          onClick={() =>
            handleInspectorPaging(currentInspectorPage - 1, itemsPerPage)
          }
        >
          Previous
        </button>
        {Array.from({ length: totalInspectorPages }, (_, i) => {
          if (i >= currentInspectorPage + 2 || i <= currentInspectorPage - 2)
            return null;
          return (
            <button
              key={i}
              disabled={currentInspectorPage === i + 1}
              onClick={() => handleInspectorPaging(i + 1, itemsPerPage)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentInspectorPage === totalInspectorPages}
          onClick={() =>
            handleInspectorPaging(currentInspectorPage + 1, itemsPerPage)
          }
        >
          Next
        </button>
      </StyleMyBookDetailPaginationButton>
      {isInspectorBookChange && (
        <MyModalComponent
          isModalOpen={isInspectorBookChange}
          onClose={handleCloseModal}
          id={isInspectorBookid}
          onReservationChange={handleReservationChange}
        />
      )}
      {isInspectorBookDelete && (
        <WarningModal
          message="검수예약을 취소하시겠습니까?"
          onClose={handleCloseModal}
          id={isInspectorBookid}
        />
      )}
    </StyleMyInspectorBookDetailContainer>
  );
};

export default MyInspectorBookDetail;

// 예약 일자 변경 모달

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ModalInput = styled.input`
  margin-right: 16px;
`;

const ModalButton = styled.button`
  margin-right: 8px;
  padding: 8px 16px;
  background: #4285f4;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #3367d6;
  }
`;

const ModalCancelButton = styled(ModalButton)`
  background: #ddd;
  color: #333;

  &:hover {
    background: #ccc;
  }
`;

const MyModalComponent = ({
  isModalOpen,
  onClose,
  id,
  onReservationChange,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  id: string | number;
  onReservationChange: (id: string | number, newDate: string) => void;
}) => {
  const [newReservationDate, setNewReservationDate] = useState("");

  const handleReservationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReservationDate(event.target.value);
  };

  const handleSubmit = async () => {
    // 토큰 가져오기
    const ObjString: string|null = localStorage.getItem('login-token')
    const Obj = ObjString ? JSON.parse(ObjString) : null;

    try {
      await axios.put(`API_ENDPOINT/${id}`, {
        reservationDate: newReservationDate,
      },
      { headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${Obj.value}`
      }});
      onReservationChange(id, newReservationDate);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <ModalContainer>
        <ModalContent>
          <ModalTitle>정비 예약시간 변경</ModalTitle>
          <ModalInput
            type="datetime-local"
            value={newReservationDate}
            onChange={handleReservationDateChange}
          />
          <ModalButton onClick={handleSubmit}>변경</ModalButton>
          <ModalCancelButton onClick={onClose}>취소</ModalCancelButton>
        </ModalContent>
      </ModalContainer>
      )}
    </>
  );
};

// 취소 관련 모달

const StyledModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const StyledModalContent = styled.div`
  width: 400px;
  background: #fff;
  padding: 24px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 24px;
  }

  button {
    background: #f44336;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

export type WarningModalType = {
  message:string,
  onClose:any,
  id: string | number
} 

const WarningModal = ({ message, onClose, id }:WarningModalType) => {

  const DeleteBook = async (id:string | number) => {
    try {
      const ObjString: string | null = localStorage.getItem('login-token');
      const Obj = ObjString ? JSON.parse(ObjString) : null;

      await axios.delete(`API_ENDPOINT/${id}`, {
        headers: {
          Authorization: `Bearer ${Obj.value}`,
        },
      });
      console.log(`예약이 삭제되었습니다.`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StyledModalContainer>
      <StyledModalContent>
        <p>{message}</p>
        <button onClick={() => DeleteBook(id)}>예</button>
        <button onClick={onClose}>아니오</button>
      </StyledModalContent>
    </StyledModalContainer>
  );
};