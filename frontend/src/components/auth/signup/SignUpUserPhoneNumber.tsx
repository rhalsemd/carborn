import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userverificationNumber } from "../../../modules/verificationNumberModule";
import { StyleSignUpInputDiv } from "../../../routes/Signup";
import { SignupFormData } from "./SignUpButton";

export type SignUpPasswordProps = {
  signupUserFormData: SignupFormData;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
}

const SignUpUserPhoneNumber = ({setSignupUserFormData, signupUserFormData}: SignUpPasswordProps) => {

  return (
    <StyleSignUpInputDiv>
      
    </StyleSignUpInputDiv>
  )
}

export default SignUpUserPhoneNumber;