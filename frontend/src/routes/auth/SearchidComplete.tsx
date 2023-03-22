import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import carbornLogo from "../../assets/carbornLogo.png";
import { StyleLoginSignUpBtn } from "./Login";
import Nav from './../../components/Nav';

const StyleSearchidCompleteContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .SearchidCompleteTitle {
    text-align: center;
    display: block;
    font-size: 2rem;
    font-weight: 900;
  }

  .SearchidCompleteGuide {
    text-align: center;
    display: block;
    font-size: 1rem;
    font-weight: 900;
    color: #3c3c3c;
  }
`;

const SearchidComplete = () => {
  const { state } = useLocation();

  return (
    <div>
      <Nav />
      <StyleSearchidCompleteContainer>
        <div>
          <img src={carbornLogo} alt="asdfasdf" />
        </div>
        <div>
          <span className="SearchidCompleteTitle">
            귀하의 아이디는 {state.name} 입니다.
          </span>
          <span className="SearchidCompleteGuide">
            로그인하시면 더욱 다양한 서비스와 혜택을 제공받으실 수 있습니다.
          </span>
        </div>
        <Link to="/login">
          <StyleLoginSignUpBtn>로그인</StyleLoginSignUpBtn>
        </Link>
      </StyleSearchidCompleteContainer>
    </div>
  );
};

export default SearchidComplete;
