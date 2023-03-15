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
  const resetFormData = () => {
    if(selectedButton === 0) {
      setSignupCompanyFormData({
        accountType: 1,
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
        accountType: 0,
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
    setSelectedButton(0);
  }

  const handleCompanySignUp = () => {
    resetFormData();
    setSelectedButton(1);
  }

  return (
    <div>
      <button onClick={handleUserSignUp}>일반회원</button>
      <button onClick={handleCompanySignUp}>기업회원</button>
    </div>
  )
}

export default SignUpButton