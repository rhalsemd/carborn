import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useState } from "react";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const DATE = date.getDate();

function Calendar() {
  const [value, setValue] = useState<any | null>(
    dayjs(`${year}-${month}-${DATE}`)
  );

  if (value) {
    console.log(value.$y, value.$M + 1, value?.$D);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label="예약 날짜">
        <DesktopDatePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}

export default Calendar;
