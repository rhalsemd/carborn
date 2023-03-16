/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";
import AdditionalSubmissionFiles from "./AdditionalSubmissionFiles";
import CarNumber from "./CarNumber";
import CarYear from "./CarYear";
import DistanceDriven from "./DistanceDriven";
import ManufacturingCompany from "./ManufacturingCompany";

const rightContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 90vh;
`;

function FormArea({ registrationInfo, setRegistrationInfo }: Props) {
  return (
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
  );
}
export default FormArea;
