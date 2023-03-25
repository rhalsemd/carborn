import Nav from './../Nav';
import styled from '@emotion/styled';
import MyUserWithdrawalComponent from './ModalComponent/MyUserWithdrawalComponent';

const StyleUserWithdrawal = styled.div`
  width: 100vw;
`

const StyleUserWithdrawalContainer = styled.div`
  width: 100vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyleUserWithdrawalTitleDiv = styled.div`
  width: 70%;
  height: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2.5rem;
    font-weight: 900;
  }

  border-bottom: 2px solid red;
  margin-top: 3rem;
`

const UserWithdrawal = () => {
  return (
    <StyleUserWithdrawal>
      <Nav />
      <StyleUserWithdrawalContainer>
        <StyleUserWithdrawalTitleDiv>
          <p>회원 탈퇴</p>
        </StyleUserWithdrawalTitleDiv>
        <MyUserWithdrawalComponent/>
      </StyleUserWithdrawalContainer>
    </StyleUserWithdrawal>
  );
};

export default UserWithdrawal;
