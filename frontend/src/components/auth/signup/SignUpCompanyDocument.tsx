import { StyleSignUpInputDiv } from "../../../routes/auth/Signup";

export interface Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFiles: File[];
}

const SignUpCompanyDocument: React.FC<Props> = ({
  handleFileChange,
  selectedFiles,
}) => {
  return (
    <StyleSignUpInputDiv>
      {/* 이전에 설명한 파일 input */}
      <input type="file" multiple onChange={handleFileChange} />
      {/* 이미 선택된 파일 리스트를 표시 */}
      <ul>
        {selectedFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyDocument;
