/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination, TableFooter } from "@mui/material";
import { useState } from "react";
import DetailModal from "./DetailModal";
import { useQuery } from "react-query";
import { useAPI } from "../../hooks/useAPI";
import { useLocation } from "react-router-dom";

interface MapType {
  id: string;
  accountId: string;
  regDt: string;
  bookDt: string;
  carModelNm: string;
  carRegNm: string;
  carVin: string;
  bookStatus: string;
}

const container = css`
  position: relative;
  opacity: 0.85;
`;

export default function ReserveTable() {
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 7;
  const isGarage = useLocation().pathname == "/garage/reserve";
  const handleChangePage = (e: any, newPage: any) => {
    setPage(newPage);
  };
  // 페이지 상태 표시를 바꿔주는 함수
  let URL;
  let queryKey;
  // 컴포넌트 재사용을 위해 url로 분기 만들기

  if (isGarage) {
    //URL = `http://192.168.100.176:80/api/repair-shop/book/list/${page}/7`;
    URL = "http://localhost:3001/content";
    queryKey = "getRepairReserveData";
  } else {
    URL = "http://localhost:3001/content";
    queryKey = "getInspectorData";
    console.log("여기는 인스펙터");
    //URL = `http://192.168.100.176:80/api/inspector/book/${page}/7`;
  }
  const getReserveData = useAPI("get", URL);
  const { data } = useQuery(queryKey, () => getReserveData, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data;
    },
    onError: (error: Error) => {
      // setError(error);
      console.log(error);
    },
    // suspense: true,
    // useErrorBoundary: true,
  });

  return (
    <div css={container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "60vw", minHeight: "60vh" }}>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">유저 아이디</TableCell>
              <TableCell align="center">요청 시간</TableCell>
              <TableCell align="center">희망 시간</TableCell>
              <TableCell align="center">차 종</TableCell>
              <TableCell align="center">차 번호</TableCell>
              <TableCell align="center">차대 번호</TableCell>
              <TableCell align="center">전화 번호</TableCell>
              <TableCell align="center">자세히 보기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(
              (
                {
                  id,
                  regDt,
                  bookDt,
                  carModelNm,
                  carRegNm,
                  carVin,
                  accountId,
                  bookStatus,
                }: MapType,
                i: number
              ) => (
                <TableRow
                  key={i}
                  hover={bookStatus ? false : true}
                  sx={
                    bookStatus
                      ? { backgroundColor: "black", opacity: "0.5" }
                      : null
                  }
                >
                  <TableCell component="th" scope="row">
                    {id}
                  </TableCell>
                  <TableCell align="right">{accountId}</TableCell>
                  <TableCell align="right">{regDt}</TableCell>
                  <TableCell align="right">{bookDt}</TableCell>
                  <TableCell align="right">{carModelNm}</TableCell>
                  <TableCell align="right">{carRegNm}</TableCell>
                  <TableCell align="right">{carVin}</TableCell>
                  <TableCell align="right">01020100209</TableCell>
                  <TableCell align="center">
                    {bookStatus ? null : <DetailModal id={id} />}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={10} //임시 나중에 서버에서 totalElement 받아야함
                page={page - 1}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
