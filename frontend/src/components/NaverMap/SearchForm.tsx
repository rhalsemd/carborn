/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const searchForm = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SearchForm() {
  const getSearchResult = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div css={searchForm}>
      <form onSubmit={getSearchResult}>
        <input type="text" placeholder="장소를 입력해주세요" />
        <input type="submit" value="검색" />
      </form>
    </div>
  );
}

export default SearchForm;
