import React from "react";
import styled from "@emotion/styled";
import { SearchInputType } from "../../../routes/auth/SearchID";

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type SearchIDNameProps = {
  setSearchInput: React.Dispatch<React.SetStateAction<SearchInputType>>;
  searchInput: SearchInputType;
};

const SearchIDName = ({ setSearchInput, searchInput }: SearchIDNameProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput({
      ...searchInput,
      name: value,
    });
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
