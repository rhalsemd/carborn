/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const dialog = css`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border: 0;
  text-align: center;
  border-radius: 20px;
  padding: 20px 50px 10px 50px;
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

function SpeedDialComponent() {
  const navigation = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const showModalFnc = () => {
    dialogRef.current?.showModal();
  };

  dialogRef.current?.addEventListener("close", () => {
    console.log(dialogRef.current?.returnValue);
  });

  return (
    <>
      <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: "fixed", bottom: "10%", right: 50 }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onClick={showModalFnc}
        ></SpeedDial>
        <dialog ref={dialogRef} css={dialog}>
          Hello! I'm a modal!
          <form method="dialog">
            <button value="close">Close</button>
            <button value="confirm">Confirm</button>
          </form>
        </dialog>
      </Box>
    </>
  );
}

export default SpeedDialComponent;
