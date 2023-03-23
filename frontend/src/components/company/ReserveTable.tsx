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
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import DetailModal from "./DetailModal";
import { useQuery } from "react-query";
import { useAPI } from "../../hooks/useAPI";

faker.seed(123);

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

const users = Array<any>(53)
  .fill(null)
  .map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.lastName() + faker.name.firstName(),
    content: faker.internet.email(),
    phone: faker.phone.number(),
  }));

export default function ReserveTable() {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(7);

  // const URL = `http://192.168.100.176:80/api/repair-shop/book/list/${page}/7`;
  const URL = "http://localhost:3001/content";
  const getRepairReserveData = useAPI("get", URL);

  const handleChangePage = (e: any, newPage: any) => {
    setPage(newPage);
  };

  const { data } = useQuery(
    "getRepairReserveData",
    () => getRepairReserveData,
    {
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
    }
  );

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
                  key={id}
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
                count={users.length}
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
