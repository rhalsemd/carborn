/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TimePicker from "./Timepicker";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import dayjs from "dayjs";
import FileUpload from "../FileUpload";

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
    flex-wrap: wrap;
  }
  .section2 {
    width: auto;
    display: flex;
    flex-direction: column;
    margin: 20px 0 0 20px;
  }

  .imgSection {
    width: 50%;
    height: 50%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
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

export default function RegisterForm() {
  const [selectTime, setSelectTime] = useState<any>("");

  const [beforeImage, setbeforeImage] = useState<string[]>([]);
  const [afterImage, setAfterImage] = useState<string[]>([]);
  const [reciptImage, setReciptImage] = useState<string[]>([]);
  const [연비, set연비] = useState<string>("");

  const change연비 = (e: any) => {
    if (/^0123456789/.test(e.target.value)) {
      console.log("aaa");
    }
  };
  return (
    <div css={container}>
      <div className="section1">
        <div className="imgSection">
          <img src={beforeImage[0]} />
        </div>
        <div className="imgSection">
          <img src={afterImage[0]} />
        </div>

        <div className="imgSection">
          <img src={reciptImage[0]} />
        </div>

        <div className="imgSection"></div>
      </div>
      <div className="section2">
        <div className="formDetail">
          수리 완료 일자
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
          수리 내용
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={3}
            size="small"
            placeholder="수리 내역을 입력해 주세요"
          />
        </div>
        <div className="formDetail">
          연비
          <TextField
            id="standard-basic"
            variant="standard"
            size="small"
            placeholder="숫자만 입력하세요"
            onChange={change연비}
          />
        </div>
        <div className="formDetail upload">
          수리 전 사진 등록
          <FileUpload size={20} row={1} setImage={setbeforeImage} />
        </div>
        <div className="formDetail upload">
          수리 후 사진 등록
          <FileUpload size={20} row={1} setImage={setAfterImage} />
        </div>
        <div className="formDetail upload">
          영수증 등록
          <FileUpload size={20} row={1} setImage={setReciptImage} />
        </div>
      </div>
    </div>
  );
}
