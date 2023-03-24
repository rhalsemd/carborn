import Nav from "../Nav";
import styled from "@emotion/styled";
import MyInspectorComponent from "./TableComponent/MyInspectorComponent";

const StyleBooking = styled.div`
  width: 100vw;
`;

const StyleBookingContainer = styled.div`
  width: 100vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleBookingTitleDiv = styled.div`
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

const InspectorContent = () => {
  return (
    <StyleBooking>
      <Nav />
      <StyleBookingContainer>
        <StyleBookingTitleDiv>
          <p>검수 내역</p>
        </StyleBookingTitleDiv>
        <MyInspectorComponent />
      </StyleBookingContainer>
    </StyleBooking>
  );
};

export default InspectorContent;
