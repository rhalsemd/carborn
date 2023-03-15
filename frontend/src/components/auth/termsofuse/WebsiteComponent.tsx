import {
  StyleTermsOfUseDiv,
  StyleTermsOfUseEleDiv,
} from "../../../routes/TermsOfUse";

export interface WebsiteProps {
  setIsChecked1: React.Dispatch<React.SetStateAction<boolean>>;
  setWebsiteDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  websiteDropdown: boolean;
  isChecked1: boolean;
  websiteTerms: string;
}

const WebsiteComponent: React.FC<WebsiteProps> = ({
  setIsChecked1,
  setWebsiteDropdown,
  websiteDropdown,
  isChecked1,
  websiteTerms,
}) => {
  const handleCheck1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked1(e.target.checked);
  };

  const handleWebsiteDropdown = () => {
    setWebsiteDropdown(!websiteDropdown);
  };

  return (
    <StyleTermsOfUseDiv>
      <div className="termsofuseclass">
        <StyleTermsOfUseEleDiv>
          <input type="checkbox" checked={isChecked1} onChange={handleCheck1} />
          <span>웹사이트 이용내역</span>
          <button onClick={handleWebsiteDropdown}>⇩</button>
        </StyleTermsOfUseEleDiv>
        {websiteDropdown && (
          <textarea
            value={websiteTerms}
            readOnly
            rows={10}
            cols={50}
            style={{ display: "block" }}
          />
        )}
      </div>
    </StyleTermsOfUseDiv>
  );
};

export default WebsiteComponent;
