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
  setSelectedButton: React.Dispatch<React.SetStateAction<string>>;
  selectedButton: string;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  setSignupCompanyFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  initialSignupFormData:SignupFormData
}

const SignUpButton = ({setSelectedButton, selectedButton, setSignupUserFormData, setSignupCompanyFormData, initialSignupFormData} : SignUpButtonProps) => {
  const resetFormData = () => {
    if(selectedButton === "user") {
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
    } else if (selectedButton === "company") {
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
    setSelectedButton("user");
  }

  const handleCompanySignUp = () => {
    resetFormData();
    setSelectedButton("company");
  }

  return (
    <div>
      <button onClick={handleUserSignUp}>일반회원</button>
      <button onClick={handleCompanySignUp}>기업회원</button>
    </div>
  )
}

export default SignUpButton