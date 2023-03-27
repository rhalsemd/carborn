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
import { useState } from "react";
import HistoryModal from "./HistoryModal";
import { useQuery } from "react-query";
import { useAPI } from "./../../hooks/useAPI";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}
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

export default function HistoryTable() {
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 7;

  const isGarage = useLocation().pathname == "/garage/history";

  let URL: any;
  let queryKey;

  if (isGarage) {
    URL = `http://carborn.site/api/repair-shop/result/list/${page + 1}/7`;
    queryKey = "getGarageHistory";
  } else {
    URL = `http://carborn.site/api/inspector/result/list/${page + 1}/7`;
    queryKey = "getInspectorHistory";
  }

  const getHistoryData = useAPI("get", URL);

  const { data, refetch } = useQuery(queryKey, () => getHistoryData, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      // return data.data;
      return data.data.message;
    },
    onError: (err) => {
      console.log(err);
    },

    suspense: true,
  });

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  console.log(data);
  useEffect(() => {
    refetch();
  }, [page]);
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
            {data?.content?.map(
              ({ id, regDt, inspectDt, mileage }: MapType, idx: number) => (
                <TableRow key={idx}>
                  <TableCell sx={{ minWidth: "20px" }}>{id}</TableCell>
                  <TableCell>{regDt}</TableCell>
                  <TableCell>{inspectDt}</TableCell>
                  <TableCell sx={{ minWidth: "30px" }}>{mileage} KM</TableCell>
                  <TableCell align="center">
                    <HistoryModal id={id} />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data.totalElements}
                // count={15}
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
