import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate, useLocation } from "react-router-dom";

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

export default function DetailModal({ id }: Props) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const isGarage = useLocation().pathname == "/garage/reserve";
  const handleClickOpen = () => {
    setOpen(true);
    navigate("");
  };

  const handleRegister = () => {
    setOpen(false);
    if (isGarage) {
      navigate("/garage/register");
    } else {
      navigate("/inspector/register");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>"수리 요청 내역"{id}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
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
    </div>
  );
}
