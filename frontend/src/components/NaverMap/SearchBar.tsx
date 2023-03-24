interface SearchBarType {
  index: number;
  searchBarItemClick: (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => void;
}

function SearchBar({ index, searchBarItemClick }: SearchBarType) {
  return (
    <div
      style={{
        transform: "translate(10%,0)",
        marginBottom: "5vh",
        cursor: "pointer",
        backgroundColor: "white",
      }}
      onClick={(event: React.MouseEvent<HTMLDivElement>) =>
        searchBarItemClick(index, event)
      }
    >
      <p
        style={{
          fontSize: "1.5rem",
          marginBottom: "0",
          fontWeight: "bolder",
        }}
      >
        정비소
      </p>
      <p
        style={{
          marginTop: "0",
          color: "#E00000",
          fontWeight: "bolder",
        }}
      >
        3.9
        <span>★★★★☆</span>
        <span style={{ color: "#BBBBBB", fontSize: "0.9rem" }}> 리뷰 15</span>
      </p>
      <p
        style={{
          marginBottom: "0",
          color: "#606060",
          fontSize: "0.9rem",
        }}
      >
        경북 구미시 구미중앙로 76
      </p>
      <p
        style={{
          margin: "0",
          color: "#C1C1C1",
          fontSize: "0.9rem",
        }}
      >
        (우) 39301 (지번) 원평동 1008-1
      </p>
      <p
        style={{
          marginTop: "0",
          color: "#038400",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        1234-5678
      </p>
      <div
        style={{
          border: "0.8px solid #C1C1C1",
          opacity: "0.3",
          width: "80%",
        }}
      ></div>
    </div>
  );
}

export default SearchBar;
