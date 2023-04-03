/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";
import { RegistrationInfo } from "./../../../routes/userUseFnc/MyVehicleRegistration";
import { titleStyle } from "./ManufacturingCompany";

const now = new Date();

function CarYear({
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  const inputTyping = (e: any) => {
    const inputValue = e.$y;
    setRegistrationInfo((registrationInfo) => {
      return {
        ...registrationInfo,
        carYear: inputValue,
      };
    });
  };

  return (
    <div>
      <span css={titleStyle}>연식</span>

      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ m: 2, margin: "0" }}>
            <DatePicker
              label={'"year"'}
              views={["year"]}
              onChange={inputTyping}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default CarYear;
