/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TimePicker from "../Timepicker";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import dayjs from "dayjs";
import FileUpload from "../../FileUpload";
import Carousels from "../Carousels";

type ImageType = string[];

const container = css`
  overflow: scroll;
  height: 75vh;
  width: 70vw;
  background-color: #f6f6f6;
  position: relative;
  opacity: 0.85;
  display: flex;
  &::-webkit-scrollbar {
    display: none;
  }

  .section1 {
    width: 50%;
    height: 100%;
    border-right: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .section2 {
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px 0 0 20px;
  }

  .imgSection {
    width: 50%;
    height: 50%;
    position: relative;
  }

  .formDetail {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }

  .text {
    margin-right: 20px;
  }

  .upload {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export default function InsuranceForm() {
  const [selectTime, setSelectTime] = useState<any>("");
  const [beforeImage, setbeforeImage] = useState<string>("");
  const [afterImage, setAfterImage] = useState<string>("");
  const [reciptImage, setReciptImage] = useState<string>("");
  const [연비, set연비] = useState<string>("");

  // const { id } = useLocation().state;

  const change연비 = (e: any) => {
    if (/^[0-9]+$/.test(e.target.value)) {
      set연비(e.target.value);
    } else {
      set연비("");
      alert("숫자만 입력하세요");
    }
  };
  return (
    <div css={container}>
      <div className="section1">
        <Carousels<ImageType> images={[beforeImage, afterImage, reciptImage]} />
      </div>
      <div className="section2">
        <div className="formDetail">
          사고 일자
          <div css={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="standard-basic"
              variant="standard"
              className="text"
              placeholder="시간을 선택해 주세요"
              value={
                !selectTime
                  ? ""
                  : dayjs(selectTime).format("YYYY-MM-DD hh시 mm분")
              }
              InputProps={{
                readOnly: true,
              }}
            />
            <TimePicker setSelectTime={setSelectTime} />
          </div>
        </div>
        <div className="formDetail">
          사고 유형
          <TextField
            id="standard-basic"
            variant="standard"
            size="small"
            value={연비}
            placeholder="사고 유형을 입력해 주세요"
            onChange={change연비}
          />
        </div>
        <div className="formDetail">
          사고 내용
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={3}
            size="small"
            placeholder={"사고 내용을 입력해 주세요"}
          />
        </div>
        <div className="formDetail upload">
          사진 등록
          <FileUpload size={20} row={1} setImage={setbeforeImage} />
        </div>
      </div>
    </div>
  );
}
