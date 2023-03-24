import { Dispatch, SetStateAction, useState } from "react";
import { SignupFormData } from "./SignUpButton";
import DaumPostcode, { Address } from "react-daum-postcode";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPages";
import {
  CloseButton,
  ModalBox,
  ModalContainer,
  ModalTitle,
} from "./SignUpUserAddress";

export type SignUpCompanyAddressProps = {
  setSignupCompanyFormData: Dispatch<SetStateAction<SignupFormData>>;
  signupCompanyFormData: SignupFormData;
};

const SignUpCompanyAddress = ({
  setSignupCompanyFormData,
  signupCompanyFormData,
}: SignUpCompanyAddressProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addressData, setAddressData] = useState<string>("");
  const handleComplete = (data: Address) => {
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      address: data.address,
    });
    setIsOpen(false);
    setAddressData(data.address);
  };

  return (
    <StyleSignUpInputDiv>
      <span>주소</span>
      <br />
      <button tabIndex={7} onClick={() => setIsOpen(true)}>검색하기</button>
      {addressData ? <span>{addressData}</span> : null}
      {isOpen && (
        <ModalContainer>
          <ModalBox>
            <ModalTitle>주소 검색</ModalTitle>
            <DaumPostcode onComplete={handleComplete} />
            <CloseButton onClick={() => setIsOpen(false)}>Close</CloseButton>
          </ModalBox>
        </ModalContainer>
      )}
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyAddress;
