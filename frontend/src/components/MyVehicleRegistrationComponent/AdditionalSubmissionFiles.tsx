import axios from "axios";
import { useMutation } from "react-query";
import { Props } from "../../routes/MyVehicleRegistration";

const fileUpLoadAPI = (data: FormData) => {
  return axios({
    method: "post",
    url: "http://192.168.100.176:8080/uploadFiles",
    data: data,
  });
};

// const fileUpLoadAPI = (data: FormData) => {
//   return axios({
//     method: "post",
//     url: "https://jsonplaceholder.typicode.com/posts",
//     data: {
//       title: "foo",
//       body: "bar",
//       userId: 1,
//     },
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   });
// };
const fileList: File[] = []; // 업로드한 파일들을 저장하는 배열

function AdditionalSubmissionFiles({
  registrationInfo,
  setRegistrationInfo,
}: Props) {
  const { mutate } = useMutation(fileUpLoadAPI, {
    onSuccess: (data) => {
      console.log("성공", data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

    const reader = new FileReader();

    uploadFiles.forEach((uploadFile) => {
      console.log(uploadFile, "업로드");
      fileList.push(uploadFile);

      reader.onload = () => {
        console.log("여기 오나");
        setRegistrationInfo((registrationInfo) => {
          const newFileListL: any = [
            ...registrationInfo.fileList,
            reader.result,
          ];

          return {
            ...registrationInfo,
            fileList: newFileListL,
          };
        });
      };
      reader.readAsDataURL(uploadFile);

      console.log(reader);
    });
  };

  const onFileUpload = () => {
    const formData = new FormData();

    fileList.forEach((file) => {
      // 파일 데이터 저장
      formData.append("multipartFiles", file);
    });

    // // 객체 (registrationInfo)
    // const foodDto = {
    //   name: "피자",
    //   price: 13500,
    // };

    formData.append("stringFoodDto", JSON.stringify(registrationInfo)); // 직렬화하여 객체 저장
    // formData.append("stringFoodDto", JSON.stringify(foodDto)); // 직렬화하여 객체 저장

    mutate(formData);
    // axios({
    //   method: "post",
    //   url: "http://192.168.100.176:8080/uploadFiles",
    //   data: formData,
    // });
  };

  return (
    <div>
      <input
        type="file"
        multiple={true} /* 파일 여러개 선택 가능하게 하기 */
        accept="image/*"
        onChange={onSaveFiles}
      />

      <div>
        {/* 등록하기 버튼 */}
        <button onClick={onFileUpload}>등록하기</button>
      </div>
    </div>
  );
}

export default AdditionalSubmissionFiles;
