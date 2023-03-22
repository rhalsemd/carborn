import Nav from './../components/Nav';
import { StyleLoginSignUpDiv } from './auth/PasswordResetCheck';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

// 이미지 가져오기
import Buy from '../assets/Buy.png';
import Booking from '../assets/Booking.png';
import Insurance from '../assets/Insurance.png';
import Gallery from '../assets/Gallery.png';
import MyCar from '../assets/MyCar.png';
import Repair from '../assets/Repair.png';
import Sell from '../assets/Sell.png';

export const StyleMyPageDiv = styled.div`
  a {
    text-decoration: none;
  }
  margin-top: 5rem;
  margin-left: 2.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;

  & > *:nth-of-type(1) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
  & > *:nth-of-type(2) {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }
  & > *:nth-of-type(3) {
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;
  }
  & > *:nth-of-type(4) {
    grid-column: 4 / span 1;
    grid-row: 1 / span 1;
  }
  & > *:nth-of-type(5) {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
  }
  & > *:nth-of-type(6) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
  }
  & > *:nth-of-type(7) {
    grid-column: 3 / span 1;
    grid-row: 2 / span 1;
  }
  & > *:nth-of-type(8) {
    grid-column: 4 / span 1;
    grid-row: 2 / span 1;
    height: 22vh;
  }
  & > *:nth-of-type(9) {
    grid-column: 4 / span 1;
    grid-row: 2 / span 1;
    margin-top: 28vh;
    height: 22vh;
  }
`;

const StyleMypageCards = styled.div`
  width: 20vw;
  height: 50vh;
  background-color: #f2f2f2;
  margin-right: 2rem;
  margin-bottom: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: #000000c3;
    font-size: 1.5rem;
    font-weight: 900;
  }
`

const StyleMypageSmallCards = styled.div`
  width: 20vw;
  height: 22vh;
  background-color: #f2f2f2;
  margin-right: 2rem;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: #000000c3;
    font-size: 1.5rem;
    font-weight: 900;
  }
`

const StyleMypageCardImg = styled.div`
  height: 40%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  img {
    width: 40%;
  }
`

const MyPage = () => {
  const userid = sessionStorage.getItem('userId')

  return (
    <div>
      <Nav/>
      <StyleLoginSignUpDiv>
        <StyleMyPageDiv>
          <Link to={`/${userid}/mypage/mycarinfo`} >
            <StyleMypageCards>
              <StyleMypageCardImg>
                <img src={MyCar} alt='MyCarInfo' />
              </StyleMypageCardImg>
              <p>내 차 정보</p>
            </StyleMypageCards>
          </Link>
          <Link to={`/${userid}/mypage/booking`} >
            <StyleMypageCards>
              <StyleMypageCardImg>
                <img src={Booking} alt='BuyReserve'/>
              </StyleMypageCardImg>
              <p>예약 정보</p>
            </StyleMypageCards>
          </Link>
          <Link to={`/${userid}/mypage/repair`} >
            <StyleMypageCards>
              <StyleMypageCardImg>
                <img src={Repair} alt='RepairInspector'/>
              </StyleMypageCardImg>
              <p>정비 및 검수 내역</p>
            </StyleMypageCards>
          </Link>
          <Link to={`/${userid}/mypage/gallery`} >
            <StyleMypageCards>
              <StyleMypageCardImg>
                <img src={Gallery} alt='Gallery'/>
              </StyleMypageCardImg>
              <p>내가 쓴 글</p>
            </StyleMypageCards>
          </Link>
          <Link to={`/${userid}/mypage/buycontent`} >
            <StyleMypageCards>
              <StyleMypageCardImg>
                <img src={Buy} alt='Buy'/>
              </StyleMypageCardImg>
              <p>구매 목록</p>
            </StyleMypageCards>
          </Link>
          <Link to={`/${userid}/mypage/sellcontent`} >
            <StyleMypageCards>
              <StyleMypageCardImg>
                <img src={Sell} alt='Sell' />
              </StyleMypageCardImg>
              <p>판매 목록</p>
            </StyleMypageCards>
          </Link>
          <Link to={`/${userid}/mypage/insurance`} >
            <StyleMypageCards>
              <StyleMypageCardImg>
                <img src={Insurance} alt='Damage' />
              </StyleMypageCardImg>
              <p>손상 내역</p>
            </StyleMypageCards>
          </Link>
          <Link to={`/${userid}/mypage/userwithdrawal`} >
            <StyleMypageSmallCards>
              <p>회원 탈퇴</p>
            </StyleMypageSmallCards>
          </Link>
          <Link to={`/${userid}/mypage/passwordmodify`} >
            <StyleMypageSmallCards>
              <p>비밀번호 변경</p>
            </StyleMypageSmallCards>
          </Link>
        </StyleMyPageDiv>
      </StyleLoginSignUpDiv>
    </div>
  )
}

export default MyPage;