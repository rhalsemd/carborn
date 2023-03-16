import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";

function CarNumber({ setRegistrationInfo }: Props) {
  const inputTyping = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
      <span>차량 번호</span>
      <div>
        <input type="text" autoComplete="false" onChange={inputTyping} />
      </div>
    </div>
  );
}

export default CarNumber;