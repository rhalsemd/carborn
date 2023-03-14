/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import AdditionalSubmissionFiles from "../components/MyVehicleRegistrationComponent/AdditionalSubmissionFiles";
import CarNumber from "../components/MyVehicleRegistrationComponent/CarNumber";
import CarYear from "../components/MyVehicleRegistrationComponent/CarYear";
import DistanceDriven from "../components/MyVehicleRegistrationComponent/DistanceDriven";
import ManufacturingCompany from "../components/MyVehicleRegistrationComponent/ManufacturingCompany";

import { useState } from "react";

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

const leftContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 400px;
  margin-right: 10vw;
`;

const rightContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 400px;
`;

export interface RegistrationInfo {
  manufacturingCompany: string;
  carNumber: string;
  carYear: string;
  distanceDriven: string;
  fileList: File[];
}

function MyVehicleRegistration() {
  const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo>({
    manufacturingCompany: "",
    carNumber: "",
    carYear: "",
    distanceDriven: "",
    fileList: [],
  });

  console.log(registrationInfo);

  return (
    <div css={outer}>
      <div css={content}>
        <div css={leftContent}></div>

        <div css={rightContent}>
          <h2 style={{ textAlign: "center" }}>차량 등록</h2>
          <hr />

          {/* 제조사 / 차량모델 */}
          <ManufacturingCompany setRegistrationInfo={setRegistrationInfo} />
          {/* 차량번호 */}
          <CarNumber setRegistrationInfo={setRegistrationInfo} />
          {/* 연식 */}
          <CarYear setRegistrationInfo={setRegistrationInfo} />
          {/* 주행거리 */}
          <DistanceDriven setRegistrationInfo={setRegistrationInfo} />
          {/* 추가 제출 파일 */}
          <AdditionalSubmissionFiles
            registrationInfo={registrationInfo}
            setRegistrationInfo={setRegistrationInfo}
          />
        </div>
      </div>
    </div>
  );
}

export default MyVehicleRegistration;
