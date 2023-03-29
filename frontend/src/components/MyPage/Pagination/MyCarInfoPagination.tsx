//MUI 컴포넌트
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import axios from "axios";
import { CARBORN_SITE } from "./../../../lib/api";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { API_URL } from './../../../lib/api';

export interface MyCarInfoPaginationProps {
  itemsPerPage: number;
}

export interface Car {
  id: number;
  model: string;
  license_plate: string;
  mileage: number;
  year: string;
  registration_date: string;
  images: any
}

const MyCarInfoPagination = ({itemsPerPage}:MyCarInfoPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [myCarInfoData, setMyCarInfoData] = useState<Car[]>([]);
  const [totalPageCnt, setTotalPageCnt] = useState(0);

  const handleRequestMyCarInfoData = async (page: number, count: number) => {
    try {
      // const response = await axios.get(`${CARBORN_SITE}/api/user/carinfo/list/${page}/${count}`);
      const response = await axios.get(`${API_URL}/mycardata`);
      // setTotalPageCnt(response.data.message.totalPages);
      
      // setMyCarInfoData(response.data.message.content);
      setMyCarInfoData(response.data);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const totalPages = totalPageCnt;

  useEffect(() => {
    handleRequestMyCarInfoData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  if(myCarInfoData.length === 0) {
    return <div>No data Found!</div>
  }

  const getCarInfoDetail = (resultId: number) => {
    if (Obj.userId) {
      navigate(`/${Obj.userId}/mypage/mycarinfo/${resultId}/detail`, {
        state: myCarInfoData[resultId % 5],
      });
    }
  } 

  return (
    <div>
      {/* <ul>
        {currentItems.map((item:any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            <th>차량번호</th>
            <th>{`주행거리(km)`}</th>
            <th>{`연식(년)`}</th>
            <th>차량등록일</th>
            <th>상세조회</th>
          </tr>
        </thead>
        <tbody>
          {myCarInfoData.map((car:Car, index) => (
            // 클릭하면 해당 리스트 아이디랑 이미지 넘겨주기
            <tr key={index}>
              <td>{car.model}</td>
              <td>{car.license_plate}</td>
              <td>{car.mileage}</td>
              <td>{car.year}</td>
              <td>{car.registration_date}</td>
              <td>
                <button onClick={() => getCarInfoDetail(car.id)}>조회</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handleRequestMyCarInfoData(currentPage - 1, itemsPerPage)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          if (i >= currentPage + 2 || i <= currentPage - 2) return null;
          return (
            <button
              key={i}
              disabled={currentPage === i + 1}
              onClick={() => handleRequestMyCarInfoData(i + 1, itemsPerPage)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleRequestMyCarInfoData(currentPage + 1, itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default MyCarInfoPagination;