import {
  StyleTermsOfUseDiv,
  StyleTermsOfUseEleDiv,
} from "../../../routes/auth/GetAgreementPage";

export interface WebsiteProps {
  setIsChecked2: React.Dispatch<React.SetStateAction<boolean>>;
  setPrivacyDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  privacyDropdown: boolean;
  isChecked2: boolean;
  privacyTerms: string;
}

const PrivacyComponent: React.FC<WebsiteProps> = ({
  setIsChecked2,
  setPrivacyDropdown,
  privacyDropdown,
  isChecked2,
  privacyTerms,
}) => {
  const handleCheck2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked2(e.target.checked);
  };

  const handlePrivacyDropdown = () => {
    setPrivacyDropdown(!privacyDropdown);
  };

  return (
    <StyleTermsOfUseDiv>
      <div className="termsofuseclass">
        <StyleTermsOfUseEleDiv>
          <input
            type="checkbox"
            id="privacy"
            checked={isChecked2}
            onChange={handleCheck2}
          />
          <span>개인정보 이용내역</span>
          <button onClick={handlePrivacyDropdown}>⇩</button>
        </StyleTermsOfUseEleDiv>
        {privacyDropdown && (
          <textarea
            value={privacyTerms}
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

export default PrivacyComponent;
