import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

import EditIcon from "@mui/icons-material/Edit";

function SpeedDialComponent() {
  const goToWriting = () => {};

  return (
    <>
      <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: "fixed", bottom: 0, right: 16 }}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onClick={goToWriting}
        ></SpeedDial>
      </Box>
    </>
  );
}

export default SpeedDialComponent;
