import styled from '@emotion/styled';
import Nav from './../Nav';
import MyBuyContentComponent from './TableComponent/MyBuyContentComponent';

const StyleBuyContent = styled.div`
  width: 100vw;
`

const StyleBuyContentContainer = styled.div`
  width: 100vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyleBuyContentTitleDiv = styled.div`
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

const BuyContent = () => {
  return (
    <StyleBuyContent>
      <Nav/>
      <StyleBuyContentContainer>
        <StyleBuyContentTitleDiv>
          <p>구매 내역</p>
        </StyleBuyContentTitleDiv>
        <MyBuyContentComponent/>
      </StyleBuyContentContainer>
    </StyleBuyContent>
  )
}

export default BuyContent;