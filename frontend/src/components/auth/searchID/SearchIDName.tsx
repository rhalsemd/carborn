import React from "react";
import styled from "@emotion/styled";
import { SearchInputObj } from "../../../routes/SearchID";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type SearchIDNameProps = {
  setinputObj: React.Dispatch<React.SetStateAction<SearchInputObj>>;
  inputObj: SearchInputObj;
}

const SearchIDName = ({ setinputObj, inputObj }:SearchIDNameProps) => {
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setinputObj({
      ...inputObj,
      name: value
    })
  };

  return (
    <StyleLoginInputDiv>
      <span>이름(회사명)</span>
      <input
        type="text"
        id="SearchName"
        autoComplete="off"
        placeholder="SearchName"
        onChange={handleChange}
      />
    </StyleLoginInputDiv>
  );
};

export default SearchIDName;
