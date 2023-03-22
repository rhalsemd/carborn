import axios from "axios";
import { useMutation } from "react-query";
import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";
import { useState } from "react";
import { RegistrationInfo } from "./../../../routes/userUseFnc/MyVehicleRegistration";

const fileUpLoadAPI = (data: FormData) => {
  return axios({
    method: "post",
    url: "http://192.168.100.176:8080/uploadFiles",
    data: data,
  });
};

function AdditionalSubmissionFiles({
  registrationInfo,
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<RegistrationInfo>>>) {
  const { mutate } = useMutation(fileUpLoadAPI);
  const [fileList, setFileList] = useState<Array<File>>([]);

  // 파일 선택
  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들
    uploadFiles.forEach((uploadFile) => {
      // fileList.push(uploadFile);
      const reader = new FileReader();
      setFileList((file) => {
        return [...file, uploadFile];
      });

      reader.onload = () => {
        setRegistrationInfo((registrationInfo) => {
          const newFileListL: File[] = [
            ...registrationInfo.fileList,
            reader.result,
          ];

          const newFileNames: string[] = [
            ...registrationInfo.fileNames,
            uploadFile.name,
          ];

          return {
            ...registrationInfo,
            fileList: newFileListL,
            fileNames: newFileNames,
          };
        });
      };

      reader.readAsDataURL(uploadFile);
    });
    e.target.value = "";
  };

  // 등록하기 버튼 누름
  const onFileUpload = () => {
    const formData = new FormData();

    fileList.forEach((file) => {
      // 파일 데이터 저장
      formData.append("multipartFiles", file);
    });

    const newRegistrationInfo = {
      manufacturingCompany: registrationInfo?.manufacturingCompany,
      carNumber: registrationInfo?.carNumber,
      carYear: registrationInfo?.carYear,
      distanceDriven: registrationInfo?.distanceDriven,
    };

    formData.append("stringFoodDto", JSON.stringify(newRegistrationInfo)); // 직렬화하여 객체 저장

    mutate(formData);
  };

  // 등록된 사진 삭제
  const deleteImg = (index: number) => {
    setFileList((fileList) => {
      const newFileList = fileList.filter((file, number) => {
        return number !== index;
      });
      return newFileList;
    });

    setRegistrationInfo((registrationInfo) => {
      const newFileListL: File[] = registrationInfo.fileList.filter(
        (file, number) => {
          return index !== number;
        }
      );

      return {
        ...registrationInfo,
        fileList: newFileListL,
      };
    });
  };

  return (
    <div>
      <input
        type="file"
        multiple={true} /* 파일 여러개 선택 가능하게 하기 */
        accept="image/*"
        onChange={onSaveFiles}
      />
      {fileList.map((file, index) => {
        return (
          <div key={`${file.name}/${index}`}>
            <span style={{ padding: "0" }}>{file.name}</span>
            <button onClick={() => deleteImg(index)}>삭제</button>
          </div>
        );
      })}
      <div>
        {/* 등록하기 버튼 */}
        <button onClick={onFileUpload}>등록하기</button>
      </div>
    </div>
  );
}

export default AdditionalSubmissionFiles;
