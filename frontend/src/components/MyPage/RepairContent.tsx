import styled from '@emotion/styled';
import Nav from './../Nav';
import MyRepairContentComponent from './TableComponent/MyRepairContentComponent';

const StyleRepairContent = styled.div`
  width: 100vw;
`;

const StyleRepairContentContainer = styled.div`
  width: 100vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleRepairContentTitleDiv = styled.div`
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
`;

const RepairContent = () => {
  return (
    <StyleRepairContent>
      <Nav />
      <StyleRepairContentContainer>
        <StyleRepairContentTitleDiv>
          <p>정비 내역</p>
        </StyleRepairContentTitleDiv>
        <MyRepairContentComponent />
      </StyleRepairContentContainer>
    </StyleRepairContent>
  )
}

export default RepairContent;