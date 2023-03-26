import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIDName from "../../components/auth/searchID/SearchIDName";
import SearchIDPhoneNumberVerify from "../../components/auth/searchID/SearchIDPhoneNumberVerify";
import Nav from "./../../components/Nav";
import { SearchIDCheckAction } from "../../modules/searchidModule";
import { useNavigate } from "react-router-dom";

export const StyleLoginSignUpDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyleLoginSignUpBoxDiv = styled.div`
  width: 25%;
  padding: 0rem, 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: #d5cfcf2a;
`;

export const StyleLoginSignUpTitle = styled.div`
  width: 100%;
  height: 20%;
  border-bottom: 1px solid red;
  text-align: center;
`;

export const StyleLoginSignUpBtn = styled.button`
  width: 15rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  background-color: #d23131;
  border: none;
  margin: 0.5rem 0;
  cursor: pointer;
`;

export const StyleLoginAnotherLink = styled.div`
  font-size: 0.7rem;
  text-decoration: none;
`;

// 타입 설정
export type SearchInputType = {
  name: string;
  phonenumber: string;
  isVerify: boolean;
};

const SearchID = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isComplete = useSelector(
    (state: any) => state.SearchIDCheckReducer.verify
  );
  const SearchIDdata = useSelector((state: any) => state.SearchIDCheckReducer);
  const [searchInput, setSearchInput] = useState<SearchInputType>({
    name: "",
    phonenumber: "",
    isVerify: false,
  });

  const handleSearchID = () => {
    dispatch(SearchIDCheckAction(searchInput));
  };

  useEffect(() => {
    if (isComplete) {
      navigate("/searchid/searchidcomplete", { state: SearchIDdata });
    }
  }, [isComplete]);

  return (
    <div>
      <Nav />
      <StyleLoginSignUpDiv>
        <StyleLoginSignUpBoxDiv>
          <StyleLoginSignUpTitle>
            <h2>아이디 찾기</h2>
          </StyleLoginSignUpTitle>
          <SearchIDName
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
          <SearchIDPhoneNumberVerify
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
          <StyleLoginSignUpBtn
            onClick={handleSearchID}
            disabled={
              !Boolean(searchInput.name) &&
              !Boolean(searchInput.phonenumber) &&
              !searchInput.isVerify
            }
          >
            아이디 찾기
          </StyleLoginSignUpBtn>
        </StyleLoginSignUpBoxDiv>
      </StyleLoginSignUpDiv>
    </div>
  );
};

export default SearchID;
