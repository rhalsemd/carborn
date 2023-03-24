import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPages";

export interface Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpCompanyDocument: React.FC<Props> = ({
  handleFileChange,
}) => {

  return (
    <StyleSignUpInputDiv>
      {/* 이전에 설명한 파일 input */}
      <input type="file" name="1" onChange={handleFileChange} />
      {/* 이미 선택된 파일 리스트를 표시 */}
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyDocument;
