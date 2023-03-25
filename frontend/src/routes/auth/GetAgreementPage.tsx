import React, { ButtonHTMLAttributes, useState } from "react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  StyleLoginSignUpBoxDiv,
  StyleLoginSignUpDiv,
  StyleLoginSignUpTitle,
} from "./LoginPage";
import WebsiteComponent from "../../components/auth/termsofuse/WebsiteComponent";
import PrivacyComponent from "../../components/auth/termsofuse/PrivacyComponent";
import Nav from "../../components/Nav";
import { GetAgreementAction } from "../../modules/getAgreementModule";

export const StyleTermsOfUseDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const StyleTermsOfUseTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const StyleTermsOfUseEleDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const StyleGoSignUpBtn = styled.button<StyleGoSignUpBtnProps>`
  width: 15rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  border: none;
  margin: 0.5rem 0;
  cursor: pointer;
`;

// CSS 타입
export interface StyleGoSignUpBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

const GetAgreementPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 이용약관 받아오기
  const GetAgreement = useSelector((state: any) => state.GetAgreementReducer);
  const [websiteTerms, setWebsiteTerms] = useState("");
  const [privacyTerms, setPrivacyTerms] = useState("");
  // 전체 체크용
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  // 드롭 다운용
  const [websiteDropdown, setWebsiteDropdown] = useState(false);
  const [privacyDropdown, setPrivacyDropdown] = useState(false);

  // 체크 박스 이벤트용
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAll(e.target.checked);
    setIsChecked1(e.target.checked);
    setIsChecked2(e.target.checked);
  };

  // 체크박스 2개 모두 true일때, 버튼 활성화
  const isButtonDisabled = (isChecked1: boolean, isChecked2: boolean) => {
    if (isChecked1 && isChecked2) {
      return false;
    } else {
      return true;
    }
  };

  // 회원가입 화면으로
  const handleSignUp = () => {
    navigate("/signup");
  };

  // 화면이 렌더링 될 때, 상황
  useEffect(() => {
    dispatch(GetAgreementAction());
    setWebsiteTerms(GetAgreement.website);
    setPrivacyTerms(GetAgreement.privacy);
    const onCheckBox = () => {
      if (isChecked1 && isChecked2) {
        setIsCheckedAll(true);
      } else {
        setIsCheckedAll(false);
      }
    };
    onCheckBox();
  }, [
    dispatch,
    GetAgreement.website,
    GetAgreement.privacy,
    isChecked1,
    isChecked2,
  ]);

  return (
    <div>
      <Nav />
      <StyleLoginSignUpDiv>
        <StyleLoginSignUpBoxDiv>
          <StyleLoginSignUpTitle>
            <h2>이용약관</h2>
          </StyleLoginSignUpTitle>
          <StyleLoginSignUpTitle>
            <StyleTermsOfUseTitleDiv>
              <span>카본에 오신 것을 환영합니다.</span>
              <span>카본에서 거래 및 커뮤니티 사용을 위하여</span>
              <span>아래의 약관 동의 및 회원가입이 필요합니다.</span>
              <div>
                <input
                  type="checkbox"
                  id="allcheckbox"
                  checked={isCheckedAll}
                  onChange={handleCheckAll}
                />
                <span>전체동의</span>
              </div>
            </StyleTermsOfUseTitleDiv>
          </StyleLoginSignUpTitle>
          <StyleTermsOfUseDiv>
            <WebsiteComponent
              setIsChecked1={setIsChecked1}
              setWebsiteDropdown={setWebsiteDropdown}
              websiteDropdown={websiteDropdown}
              isChecked1={isChecked1}
              websiteTerms={websiteTerms}
            />
            <PrivacyComponent
              setIsChecked2={setIsChecked2}
              setPrivacyDropdown={setPrivacyDropdown}
              privacyDropdown={privacyDropdown}
              isChecked2={isChecked2}
              privacyTerms={privacyTerms}
            />
          </StyleTermsOfUseDiv>
          <StyleGoSignUpBtn
            backgroundColor={
              isButtonDisabled(isChecked1, isChecked2) ? "grey" : "#d23131"
            }
            disabled={isButtonDisabled(isChecked1, isChecked2)}
            onClick={handleSignUp}
          >
            회원가입 하기
          </StyleGoSignUpBtn>
        </StyleLoginSignUpBoxDiv>
      </StyleLoginSignUpDiv>
    </div>
  );
};

export default GetAgreementPage;