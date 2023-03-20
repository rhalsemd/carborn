import { useDispatch } from "react-redux";
import { companyidCheckReset, useridCheckReset } from "../../../modules/idcheckModule";

// 타입
export type SignupFormData = {
  accountType: number;
  name: string;
  id: string;
  idcheck: boolean | null;
  password: string;
  passwordcheck: boolean;
  identifynumber: string;
  address: string;
  isVarify: boolean;
};

export type SignUpButtonProps = {
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
  selectedButton: number;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  setSignupCompanyFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  isUser:boolean;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
  setIddupliCheck: React.Dispatch<React.SetStateAction<null | boolean | undefined>>
  iddupliCheck:boolean | null | undefined;
}

const SignUpButton = ({setSelectedButton, selectedButton, setSignupUserFormData, setSignupCompanyFormData, isUser, setIsUser, setIddupliCheck, iddupliCheck} : SignUpButtonProps) => {
  // 상수화
  const USER = 0
  const REPAIR = 1

  // 액션
  const dispatch = useDispatch();
  
  const resetFormData = () => {
    dispatch(useridCheckReset());
    dispatch(companyidCheckReset());

    if(selectedButton === USER) {
      setSignupCompanyFormData({
        accountType: REPAIR,
        name: "",
        id: "",
        idcheck: null,
        password: "",
        passwordcheck: false,
        identifynumber: "",
        address: "",
        isVarify: false,
      })
    } else {
      setSignupUserFormData({
        accountType: USER,
        name: "",
        id: "",
        idcheck: null,
        password: "",
        passwordcheck: false,
        identifynumber: "",
        address: "",
        isVarify: false,
      })
    }
  }

  const handleUserSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    resetFormData();
    setSelectedButton(USER);
    setIsUser(true)
  }

  const handleCompanySignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    resetFormData();
    setSelectedButton(REPAIR);
    setIsUser(false)
  }

  return (
    <div>
      <button onClick={(e) => handleUserSignUp(e)}>일반회원</button>
      <button onClick={(e) => handleCompanySignUp(e)}>기업회원</button>
    </div>
  )
}

export default SignUpButton