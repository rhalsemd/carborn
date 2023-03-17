/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useState } from "react";
import Thumnail from "../../components/MyVehicleRegistrationComponent/leftContents/Thumnail";
import FormArea from "../../components/MyVehicleRegistrationComponent/rightContents/FormArea";

const outer = css`
  border: 1px solid black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const content = css`
  display: flex;
  align-items: center;
`;

export interface RegistrationInfo {
  manufacturingCompany: string;
  carNumber: string;
  carYear: string;
  distanceDriven: string;
  fileList: any[];
}

export interface Props {
  registrationInfo?: RegistrationInfo;
  setRegistrationInfo: React.Dispatch<React.SetStateAction<RegistrationInfo>>;
}

function MyVehicleRegistration() {
  const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo>({
    manufacturingCompany: "",
    carNumber: "",
    carYear: "",
    distanceDriven: "",
    fileList: [],
  });

  return (
    <div css={outer}>
      <div css={content}>
        {/* 왼쪽 컨텐츠 */}
        <Thumnail registrationInfo={registrationInfo} />
        {/* 오른쪽 컨텐츠*/}
        <FormArea
          setRegistrationInfo={setRegistrationInfo}
          registrationInfo={registrationInfo}
        />
      </div>
    </div>
  );
}

export default MyVehicleRegistration;
