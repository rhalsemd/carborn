import styled from '@emotion/styled';

const StyleHomeDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function TestHome() {
  return (
    <StyleHomeDiv>
      <h1>홈화면입니다.</h1>
    </StyleHomeDiv>
  );
}

export default TestHome;
