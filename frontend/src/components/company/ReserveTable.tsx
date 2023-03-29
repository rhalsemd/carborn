/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination, TableFooter } from "@mui/material";
import { useState } from "react";
import DetailModal from "./DetailModal";
import { useQuery } from "react-query";
import { useAPI } from "../../hooks/useAPI";
import { useLocation } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import { useEffect } from "react";

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
`;

export default function ReserveTable() {
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 7;
  const isGarage = useLocation().pathname == "/garage/reserve";
  // 페이지 상태 표시를 바꿔주는 함수
  let URL;
  let queryKey;
  // 컴포넌트 재사용을 위해 url로 분기 만들기
  if (isGarage) {
    URL = `http://carborn.site/api/repair-shop/book/list/${page + 1}/7`;
    queryKey = "getRepairReserveData";
  } else {
    URL = `http://carborn.site/api/inspector/book/list/${page + 1}/7`;
    queryKey = "getInspectorData";
    //URL = `http://192.168.100.176:80/api/inspector/book/${page}/7`;
  }

  const getReserveData = useAPI("get", URL);
  const { data, refetch } = useQuery(queryKey, () => getReserveData, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data.message;
    },
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: (res) => {
      // console.log(res);
    },
    suspense: true,
    // useErrorBoundary: true,
  });
  // console.log(data);
  useEffect(() => {
    refetch();
  }, [page]);

  const handleChangePage = (e: any, newPage: any) => {
    setPage(() => newPage);
    // refetch();
    console.log(newPage);
  };
  return (
    <div css={container}>
      <TableContainer sx={{ backgroundColor: "rgba(246, 246, 246, 0.85)" }}>
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
            {data?.content?.map(
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
                idx: number
              ) => (
                <TableRow
                  key={idx}
                  hover={bookStatus ? false : true}
                  sx={
                    bookStatus
                      ? {
                          backgroundColor: "rgba(166, 166, 166, 0.85)",
                        }
                      : null
                  }
                >
                  <TableCell component="th" scope="row">
                    {id}
                  </TableCell>
                  <TableCell>{accountId}</TableCell>
                  <TableCell>{regDt}</TableCell>
                  <TableCell>{bookDt}</TableCell>
                  <TableCell>{carModelNm}</TableCell>
                  <TableCell>{carRegNm}</TableCell>
                  <TableCell>{carVin}</TableCell>
                  <TableCell>01020100209</TableCell>
                  <TableCell align="center">
                    <DetailModal id={id} status={bookStatus} />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data?.totalElements}
                page={page}
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
