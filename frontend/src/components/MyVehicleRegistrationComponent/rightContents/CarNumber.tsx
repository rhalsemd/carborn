import {
  Props,
  RegistrationInfo,
} from "../../../routes/userUseFnc/MyVehicleRegistration";

function CarNumber({
  setRegistrationInfo,
}: Props<React.Dispatch<React.SetStateAction<Partial<RegistrationInfo>>>>) {
  const inputTyping = (e: React.FocusEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    setRegistrationInfo((registrationInfo) => {
      return {
        ...registrationInfo,
        carNumber: inputValue,
      };
    });
  };

  return (
    <div>
      <span>차량번호</span>
      <div>
        <input type="text" autoComplete="false" onBlur={inputTyping} />
      </div>
    </div>
  );
}

export default CarNumber;
