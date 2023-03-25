import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { useState } from "react";
import { Props } from "./ReserveForm";

// const date = new Date();
// const year = date.getFullYear();
// const month = date.getMonth() + 1;
// const DATE = date.getDate();

function Calendar({ setReserveInfo }: Pick<Props, "setReserveInfo">) {
  // const [value, setValue] = useState<any | null>(
  //   dayjs(`${year}-${month}-${DATE}`)
  // );
  const [value, setValue] = useState<any | null>(dayjs(""));

  const pickCalendar = (newValue: any) => {
    const YEAR = newValue.$y;
    const MONTH = newValue.$M + 1;
    const DATE = newValue.$D;

    setValue(newValue);
    setReserveInfo((reserveInfo) => {
      return { ...reserveInfo, date: `${YEAR}${MONTH}${DATE}` };
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label="예약 날짜">
        <DesktopDatePicker
          value={value}
          onChange={(newValue) => pickCalendar(newValue)}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}

export default Calendar;
