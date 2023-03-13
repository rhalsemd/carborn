import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { RegistrationInfo } from "../../routes/MyVehicleRegistration";

interface Props {
  setRegistrationInfo: React.Dispatch<React.SetStateAction<RegistrationInfo>>;
}

// 허용가능한 확장자 목록!
const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB

function AdditionalSubmissionFiles({ setRegistrationInfo }: Props) {
  const fileList: File[] = []; // 업로드한 파일들을 저장하는 배열

  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

    uploadFiles.forEach((uploadFile) => {
      fileList.push(uploadFile);
    });
  };

  const onFileUpload = () => {
    const formData = new FormData();

    fileList.forEach((file) => {
      // 파일 데이터 저장
      formData.append("multipartFiles", file);
    });

    // 객체
    const foodDto = {
      name: "피자",
      price: 13500,
    };

    formData.append("stringFoodDto", JSON.stringify(foodDto)); // 직렬화하여 객체 저장

    console.log(formData);

    axios({
      method: "post",
      url: "http://192.168.100.176:8080/uploadFiles",
      data: formData,
    });
  };

  return (
    <div>
      <input
        type="file"
        multiple={true}
        /* 파일 여러개 선택 가능하게 하기 */ onChange={onSaveFiles}
      />
      <button onClick={onFileUpload}>파일 업로드</button>
    </div>
  );
}

export default AdditionalSubmissionFiles;
