// 타입
export type SignupFormData = {
  accountType: number;
  name: string;
  id: string;
  password: string;
  passwordcheck: boolean;
  birth: string;
  address: string;
  phonenumber: string;
  FileList: any[];
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
  const PERSON = 0
  const REPAIR = 1
  
  const resetFormData = () => {
    if(selectedButton === PERSON) {
      setSignupCompanyFormData({
        accountType: REPAIR,
        name: "",
        id: "",
        password: "",
        passwordcheck: false,
        birth: "",
        address: "",
        phonenumber: "",
        FileList: [],
      })
    } else {
      setSignupUserFormData({
        accountType: PERSON,
        name: "",
        id: "",
        password: "",
        passwordcheck: false,
        birth: "",
        address: "",
        phonenumber: "",
        FileList: [],
      })
    }
  }

  const handleUserSignUp = () => {
    resetFormData();
    setSelectedButton(PERSON);
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