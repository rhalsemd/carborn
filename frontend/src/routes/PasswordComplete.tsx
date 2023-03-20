import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import carbornLogo from '../assets/carbornLogo.png'
import { StyleLoginSignUpBtn } from "./Login";

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
`

const PasswordComplete = () => {
  return (
    <StyleSearchidCompleteContainer>
      <div>
        <img src={carbornLogo} alt="asdfasdf"/>
      </div>
      <div>
        <span className="SearchidCompleteTitle">비밀번호 재설정을 완료했습니다.</span>
        <span className="SearchidCompleteGuide">로그인을 하시려면 아래 버튼을 눌러주세요</span>
      </div>
      <Link to='/login' ><StyleLoginSignUpBtn>로그인</StyleLoginSignUpBtn></Link>
    </StyleSearchidCompleteContainer>
  )
}

export default PasswordComplete;