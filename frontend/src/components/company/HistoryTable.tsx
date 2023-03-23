/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination, TableFooter } from "@mui/material";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import HistoryModal from "./garage/HistoryModal";
import { useQuery } from "react-query";
import { useAPI } from "./../../hooks/useAPI";
import { Suspense } from "react";

interface MapType {
  id: string;
  regDt: string;
  mileage: string;
  inspectDt: string;
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

export default function HistoryTable() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(7);

  const URL = "http://localhost:3001/test1";

  const getRepairResult = useAPI("get", URL);

  const { data } = useQuery("getRepairReuslt", () => getRepairResult, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data;
    },
    onError: (err) => {
      console.log(err);
    },
    suspense: true,
  });
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
              <TableCell align="center">요청 날짜</TableCell>
              <TableCell align="center">완료 날짜</TableCell>
              <TableCell align="center">주행 거리</TableCell>
              <TableCell align="center">자세히 보기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right">{data.id}</TableCell>
              <TableCell align="right">{data.regDt}</TableCell>
              <TableCell align="right">{data.inspectDt}</TableCell>
              <TableCell align="right">{data.mileage} KM</TableCell>
              <TableCell align="center">
                <HistoryModal id={data.id} />
              </TableCell>
            </TableRow>
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
