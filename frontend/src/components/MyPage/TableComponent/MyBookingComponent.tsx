import styled from "@emotion/styled";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from './../../../lib/api';
import axios from "axios";
import BookingPagination from "../Pagination/BookingPagination";

const ITEMS_PER_PAGE = 5;

const StyleMyBookingTableDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyBookingComponent = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${API_URL}/bookingdata`);
      setBookingData(result.data);
    };
    fetchData();
  }, []);

  if (bookingData.length === 0) {
    return <div>No data Found</div>;
  }

  return (
    <StyleMyBookingTableDiv>
      <BookingPagination data={bookingData} itemsPerPage={ITEMS_PER_PAGE} />
    </StyleMyBookingTableDiv>
  );
};

export default MyBookingComponent;
