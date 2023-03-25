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
import { useState } from "react";
import DetailModal from "./DetailModal";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { useAPI } from "../../hooks/useAPI";

faker.seed(123);

const repairShopId = 1;

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
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(7);
  const url = useLocation().pathname;
  const num = 9;
  // const URL = `http://192.168.100.176:80/api/repair-shop/book/list/${page}/7`;
  // const URL = `http://192.168.100.176:80/api/repair-shop/book/${num}`;
  const URL = `http://192.168.100.176:80/api/insurance/list/22`;
  const getRepairReserveData = useAPI("get", URL);
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

  console.log(data);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <div css={container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "60vw", minHeight: "60vh" }}>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">요청 시간</TableCell>
              <TableCell align="center">
                {url == "/garage/reserve" ? "수리 내용" : "검수 내용"}
              </TableCell>
              <TableCell align="center">희망 시간</TableCell>
              <TableCell align="center">전화 번호</TableCell>
              <TableCell align="center">자세히 보기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(({ id, name, content, phone }, i) => (
                <TableRow key={id} hover={true}>
                  <TableCell component="th" scope="row">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell align="right">{name}</TableCell>
                  <TableCell align="right">{content}</TableCell>
                  <TableCell align="right">{phone}</TableCell>
                  <TableCell align="right">{phone}</TableCell>
                  <TableCell align="center">
                    <DetailModal id={id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={users.length}
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
