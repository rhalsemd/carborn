/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { useAPI } from "../../hooks/useAPI";
import { Suspense } from "react";

interface Props {
  id: string;
}

interface MapType {
  accountId: string;
}

const tableStyle = css`
  tr {
    border-spacing: 10px;
  }
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailModal({ id }: Props) {
  // const URL = `http://localhost:3001/test`;
  let URL;
  let queryKey;

  const isGarage = useLocation().pathname == "/garage/reserve";
  const navigate = useNavigate();

  if (isGarage) {
    //URL = `http://192.168.100.176:80/api/repair-shop/book/${id}`;
    URL = "http://localhost:3001/test";
    queryKey = "getRepairDetailData";
  } else {
    URL = "http://localhost:3001/test";
    queryKey = "getInspectorDetailData";
    //URL = `http://192.168.100.176:80/api/inspector/book/${id}`;
  }
  const getRepairDetail = useAPI("get", URL);
  const { data } = useQuery(queryKey, () => getRepairDetail, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data;
    },
    onError: (error: Error) => {
      console.log(error);
    },
    enabled: !!id,
    suspense: true,
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRegister = () => {
    setOpen(false);
    if (isGarage) {
      navigate("/garage/register", { state: { id } });
    } else {
      navigate("/inspector/register", { state: { id } });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#d23131" }}
        onClick={handleClickOpen}
        size="small"
      >
        보기
      </Button>
      <Suspense fallback={<>asdf</>}>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCancel}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>수리 요청 내역</DialogTitle>
          <DialogContent>
            <table css={tableStyle}>
              <thead></thead>
              <tbody>
                <tr>
                  <td>아이디</td>
                  <td> : {data.accountId}</td>
                </tr>
                <tr>
                  <td>이름</td>
                  <td> : {data.accountName}</td>
                </tr>
                <tr>
                  <td>전화번호</td>
                  <td> : {data.accountPhoneNo}</td>
                </tr>
                <tr>
                  <td>차종</td>
                  <td> : {data.carModelNm}</td>
                </tr>
                <tr>
                  <td>차번호</td>
                  <td> : {data.carRegNm}</td>
                </tr>
                <tr>
                  <td>차대 번호</td>
                  <td> : {data.carVin}</td>
                </tr>
                <tr>
                  <td>내용</td>
                  <td> : {data.content}</td>
                </tr>
              </tbody>
            </table>

            {/* </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCancel}>
              취소
            </Button>
            <Button variant="contained" onClick={handleRegister}>
              {isGarage ? "정비 내역 등록" : "검수 내역 등록"}
            </Button>
          </DialogActions>
        </Dialog>
      </Suspense>
    </>
  );
}
