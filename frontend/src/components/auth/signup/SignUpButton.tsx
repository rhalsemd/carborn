import { useDispatch, useSelector } from "react-redux";
import {
  companyidCheckReset,
  useridCheckReset,
} from "../../../modules/UserIdCheckModule";
import { SetIsSignupAction } from "../../../modules/signUpModule";
import { useEffect } from "react";
import { setUserAccountType } from "../../../modules/setAccountTypeModule";

// 타입
export type SignupFormData = {
  accountType: number | string;
  name: string;
  userid: string;
  idcheck: boolean | null;
  password: string;
  phonenumber: string;
  passwordcheck: boolean;
  identifynumber: string;
  address: string;
  isVarify: boolean;
};

export type SignUpButtonProps = {
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
  selectedButton: number;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  signupUserFormData: SignupFormData;
  setSignupCompanyFormData: React.Dispatch<
    React.SetStateAction<SignupFormData>
  >;
  signupCompanyFormData: SignupFormData;
  isUser: boolean;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
  setIddupliCheck: React.Dispatch<
    React.SetStateAction<null | boolean | undefined>
  >;
  iddupliCheck: boolean | null | undefined;
  setIsValid:any
  isValid:any
};

const SignUpButton = ({
  setSelectedButton,
  selectedButton,
  setSignupUserFormData,
  signupUserFormData,
  setSignupCompanyFormData,
  signupCompanyFormData,
  isUser,
  setIsUser,
  setIddupliCheck,
  iddupliCheck,
  setIsValid,
  isValid
}: SignUpButtonProps) => {
  // 상수화
  const USER = 0;
  const REPAIR = 1;

  // 리듀서 가져오기

  // 액션
  const dispatch = useDispatch();
  const accountType = useSelector((state:any) => state.setAccountTypeReducer.accountType)
  console.log(accountType)
  console.log(typeof accountType)

  const resetFormData = () => {
    dispatch(useridCheckReset());
    dispatch(companyidCheckReset());
  };

  const handleUserSignUp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    resetFormData();
    dispatch(setUserAccountType(USER));
    setSelectedButton(USER);
    setIsUser(true);
    setIsValid(false)
  };

  const handleCompanySignUp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    resetFormData();
    dispatch(setUserAccountType(REPAIR));
    setSelectedButton(REPAIR);
    setIsUser(false);
    setIsValid(false)
  };

  useEffect(() => {
    if (selectedButton === USER) {
      setSignupCompanyFormData({
        accountType: REPAIR,
        name: "",
        userid: "",
        idcheck: null,
        password: "",
        passwordcheck: false,
        phonenumber:"",
        identifynumber: "",
        address: "",
        isVarify: false,
      });
      dispatch(SetIsSignupAction(true));
    } else {
      setSignupUserFormData({
        accountType: USER,
        name: "",
        userid: "",
        idcheck: null,
        password: "",
        passwordcheck: false,
        identifynumber: "",
        phonenumber:"",
        address: "",
        isVarify: false,
      });
      dispatch(SetIsSignupAction(true));
    }
  }, [
    selectedButton,
    dispatch,
    setSignupUserFormData,
    setSignupCompanyFormData,
  ]);

  return (
    <div>
      <button onClick={(e) => handleUserSignUp(e)}>일반회원</button>
      <button onClick={(e) => handleCompanySignUp(e)}>기업회원</button>
    </div>
  );
};

export default SignUpButton;
