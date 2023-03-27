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
import { useLocation } from "react-router-dom";
import { useAPI } from "./../../hooks/useAPI";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";

const tableStyle = css`
  tr {
    border-spacing: 10px;
  }
  width: 20vw;
`;

interface Props {
  id: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HistoryModal({ id }: Props) {
  const [open, setOpen] = React.useState(false);

  const client = useQueryClient();

  let URL;
  let queryKey: string;
  const isGarage = useLocation().pathname == "/garage/history";

  if (isGarage) {
    URL = `http://carborn.site/api/repair-shop/result/${id}`;
    queryKey = `getGarageHistoryDetail${id}`;
  } else {
    URL = `http://carborn.site/api/inspector/result/${id}`;
    queryKey = `getInspectorHistoryDetail${id}`;
  }

  const { data } = useQuery(queryKey, () => getDetailData, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data.message;
    },
    onError: (err) => {
      console.log(err);
    },
    enabled: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
    client.fetchQuery(queryKey);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(data);
  const getDetailData = useAPI("get", URL);

  return (
    <div>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#d23131" }}
        onClick={handleClickOpen}
        size="small"
      >
        보기
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>사진</DialogTitle>
        <DialogContent>
          <table css={tableStyle}>
            <thead></thead>
            <tbody>
              <tr>
                <td>내용</td>
                <td> : {data?.content}</td>
              </tr>
              <tr>
                <td>차종</td>
                <td> : {data?.inspectBookCarModelNm}</td>
              </tr>
              <tr>
                <td>예약자명</td>
                <td> : {data?.inspectBookInspectorAccountName}</td>
              </tr>
              <tr>
                <td>날짜</td>
                <td> : {data?.inspectDt}</td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
