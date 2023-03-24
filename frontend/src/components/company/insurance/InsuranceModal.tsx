import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { useAPI } from "./../../../hooks/useAPI";

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

export default function InsuranceModal({ id }: Props) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState<any>(null);

  const client = useQueryClient();

  const URL = "http://localhost:3001/history";
  const queryKey: string = `getGarageHistoryDetail${id}`;
  // URL = `http://192.168.100.176:80/api/repair-shop/result/${id}`;

  const {} = useQuery(queryKey, () => getDetailData, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    select: (data) => {
      return data.data;
      // return data.data.message;
    },
    onError: (err) => {
      console.log(err);
    },
    enabled: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
    (async () => {
      const res: any = await client.fetchQuery(queryKey);
      setData(res.data);
    })();
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <DialogContentText id="alert-dialog-slide-description">
            사진들
          </DialogContentText>
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
