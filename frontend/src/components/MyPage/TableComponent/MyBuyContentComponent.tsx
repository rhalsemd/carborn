import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { API_URL } from './../../../lib/loginApi';
import axios from 'axios';
import BuyContentPagination from '../Pagination/BuyContentPagination';

const ITEMS_PER_PAGES = 5;

const StyleMyBuyContentTableDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MyBuyContentComponent = () => {
  const [buyContentData, setBuyContentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${API_URL}/buycontent`);
      setBuyContentData(result.data)
    } 
    fetchData();
  }, [])

  if (buyContentData.length === 0){
    return <div>No data Found</div>
  }

  return (
    <StyleMyBuyContentTableDiv>
      <BuyContentPagination data={buyContentData} itemsPerPage={ITEMS_PER_PAGES} />
    </StyleMyBuyContentTableDiv>
  )
}

export default MyBuyContentComponent;