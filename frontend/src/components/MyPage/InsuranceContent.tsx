import styled from '@emotion/styled';
import Nav from './../Nav';
import MyInsuranceContentComponent from './TableComponent/MyInsuranceContentComponent';

const StyleInsuranceContent = styled.div`
  width: 100vw;
`;

const StyleInsuranceContentContainer = styled.div`
  width: 100vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleInsuranceContentTitleDiv = styled.div`
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

const InsuranceContent = () => {

  return (
    <StyleInsuranceContent>
      <Nav />
      <StyleInsuranceContentContainer>
        <StyleInsuranceContentTitleDiv>
          <p>손상 내역</p>
        </StyleInsuranceContentTitleDiv>
        <MyInsuranceContentComponent />
      </StyleInsuranceContentContainer>
    </StyleInsuranceContent>
  );
};

export default InsuranceContent;
