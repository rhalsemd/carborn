/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import ApplyBtn from "./ApplyBtn";

import Calendar from "./Calendar";
import MyCarInformation from "./MyCarInformation";
import TextBox from "./TextBox";

const title = css`
  text-align: center;
`;

interface reserveInfoType {
  carId: string;
  shopId: string;
  userId: string;
  content: string;
  date: string;
}

function ReserveForm({ data }: { data: any }) {
  const [reserveInfo, setReserveInfo] = useState<reserveInfoType>({
    carId: "",
    shopId: "",
    userId: "",
    content: "",
    date: "",
  });

  return (
    <div>
      <h2 css={title}>예약 정보 입력</h2>
      <MyCarInformation data={data} />
      <TextBox />
      <Calendar />
      <ApplyBtn />
    </div>
  );
}

export default ReserveForm;
