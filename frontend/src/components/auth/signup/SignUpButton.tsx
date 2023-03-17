// 타입
export type SignupFormData = {
  accountType: number;
  name: string;
  id: string;
  password: string;
  passwordcheck: boolean;
  identifynumber: string;
  address: string;
  phonenumber: string;
  FileList?: any[];
};

export type SignUpButtonProps = {
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
  selectedButton: number;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  setSignupCompanyFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  initialSignupFormData:SignupFormData
}

const SignUpButton = ({setSelectedButton, selectedButton, setSignupUserFormData, setSignupCompanyFormData, initialSignupFormData} : SignUpButtonProps) => {
  // 상수화
  const USER = 0
  const REPAIR = 1
  
  const resetFormData = () => {
    if(selectedButton === USER) {
      setSignupCompanyFormData({
        accountType: REPAIR,
        name: "",
        id: "",
        password: "",
        passwordcheck: false,
        identifynumber: "",
        address: "",
        phonenumber: "",
        FileList: [],
      })
    } else {
      setSignupUserFormData({
        accountType: USER,
        name: "",
        id: "",
        password: "",
        passwordcheck: false,
        identifynumber: "",
        address: "",
        phonenumber: "",
        FileList: [],
      })
    }
  }

  const handleUserSignUp = () => {
    resetFormData();
    setSelectedButton(USER);
  }

  const handleCompanySignUp = () => {
    resetFormData();
    setSelectedButton(REPAIR);
  }

  return (
    <div>
      <button onClick={handleUserSignUp}>일반회원</button>
      <button onClick={handleCompanySignUp}>기업회원</button>
    </div>
  )
}

export default SignUpButton