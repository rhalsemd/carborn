import { Props } from "../../../routes/userUseFnc/MyVehicleRegistration";

function DistanceDriven({ setRegistrationInfo }: Props) {
  const inputTyping = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    setRegistrationInfo((registrationInfo) => {
      return {
        ...registrationInfo,
        distanceDriven: inputValue,
      };
    });
  };

  return (
    <div>
      <span>주행거리(km)</span>
      <div>
        <input type="number" defaultValue="0" min="0" onChange={inputTyping} />
      </div>
    </div>
  );
}

export default DistanceDriven;
