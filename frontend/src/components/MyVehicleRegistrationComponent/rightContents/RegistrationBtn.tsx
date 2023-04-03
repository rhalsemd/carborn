import { useMutation } from "react-query";
import {
  Props,
  RegistrationInfo,
} from "./../../../routes/userUseFnc/MyVehicleRegistration";

interface APIType {
  API: string;
}
interface NewRegistrationInfoType {
  newRegistrationInfo: Partial<RegistrationInfo>;
}

type RegistrationBtnType = Props<
  React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>
> &
  APIType &
  NewRegistrationInfoType;

function RegistrationBtn({
  registrationInfo,
  setRegistrationInfo,
  newRegistrationInfo,
  API,
}: RegistrationBtnType) {
  // mutation 함수
  const fileUpLoadAPI = (data: FormData) => {
    return fetch(API, {
      method: "POST",
      body: data,
      mode: "no-cors",
    });
  };

  const { mutate } = useMutation(fileUpLoadAPI);

  // 등록하기 버튼 누름
  const onFileUpload = () => {
    const formData = new FormData();

    (registrationInfo?.files || []).forEach((file) => {
      // 파일 데이터 저장
      formData.append("carImg", file);
    });
    (registrationInfo?.vrc || []).forEach((file) => {
      // 파일 데이터 저장
      formData.append("carVrc", file);
    });

    formData.append("modelNm", registrationInfo?.carModel); // 직렬화하여 객체 저장
    formData.append("modelYear", registrationInfo?.carYear); // 직렬화하여 객체 저장
    formData.append("vin", registrationInfo?.vehicleIdentificationNumber); // 직렬화하여 객체 저장
    formData.append("mileage", registrationInfo?.distanceDriven); // 직렬화하여 객체 저장
    formData.append("regNm", registrationInfo?.carNumber); // 직렬화하여 객체 저장
    formData.append("maker", registrationInfo?.manufacturingCompany); // 직렬화하여 객체 저장

    mutate(formData); // post 요청 실행
  };

  return (
    <div>
      {/* 등록하기 버튼 */}
      <button onClick={onFileUpload}>등록하기</button>
    </div>
  );
}

export default RegistrationBtn;
