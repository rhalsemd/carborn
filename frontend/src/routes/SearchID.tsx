import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import LoginID from "../components/auth/login/LoginID";
import LoginPassword from "../components/auth/login/LoginPassword";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginTry, User } from "../modules/loginModule";
import { useSelector } from "react-redux";
import SearchIDName from "../components/auth/searchID/SearchIDName";
import SearchIDVerify from "../components/auth/searchID/SearchIDVerify";
import { searchidCheck } from "../modules/searchIDModule";

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
`;

export const StyleLoginAnotherLink = styled.div`
  font-size: 0.7rem;
  text-decoration: none;
`;

// 타입 설정
export type SearchInputObj = {
  name: string;
  phonenumber: string;
  isVerify: boolean;
};

const SearchID = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state:{searchid:{isVerify:boolean}}) => state.searchid)
  const [isSearchIdOk, setIsSearchIdOk] = useState(false)
  const [inputObj, setinputObj] = useState<SearchInputObj>({
    name: "",
    phonenumber: "",
    isVerify: false,
  });

  const handleSearchID = () => {
    dispatch(searchidCheck(inputObj))
  }

  useEffect(() => {
    if (selector.isVerify) {
      setIsSearchIdOk(selector.isVerify);
    }
  }, [selector.isVerify]);

  useEffect(() => {
    if (isSearchIdOk) {
      navigate("/searchid/searchidcomplete", { state: selector });
    }
  }, [isSearchIdOk, navigate, selector]);

  return (
    <StyleLoginSignUpDiv>
      <StyleLoginSignUpBoxDiv>
        <StyleLoginSignUpTitle>
          <h2>아이디 찾기</h2>
        </StyleLoginSignUpTitle>
        <SearchIDName setinputObj={setinputObj} inputObj={inputObj}/>
        <SearchIDVerify setinputObj={setinputObj} inputObj={inputObj}/>
        <StyleLoginSignUpBtn onClick={handleSearchID}>
          아이디 찾기
        </StyleLoginSignUpBtn>
      </StyleLoginSignUpBoxDiv>
    </StyleLoginSignUpDiv>
  );
};

export default SearchID;