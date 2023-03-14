/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Props } from "../../routes/MyVehicleRegistration";

const leftContent = css`
  border: 1px solid black;
  width: 40vw;
  height: 50vh;
  margin-right: 10vw;
`;
function Thumnail({ registrationInfo }: Pick<Props, "registrationInfo">) {
  return (
    <div css={leftContent}>
      <img
        src={registrationInfo?.fileList[0]}
        alt="Thumnail"
        width="100%"
        height="20%"
      />
      {registrationInfo?.fileList
        ? registrationInfo?.fileList.map((item, index) => {
            return index !== 0 ? (
              <img
                key={item}
                src={item}
                alt="사진"
                style={{ width: "100%", height: "20%" }}
              />
            ) : null;
          })
        : null}
    </div>
  );
}

export default Thumnail;
