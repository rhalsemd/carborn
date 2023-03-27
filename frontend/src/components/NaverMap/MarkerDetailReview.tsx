function MarkerDetailReview({ data }: { data: any }) {
  return (
    <div>
      <p style={{ marginBottom: "0", fontWeight: "900" }}>{data.accountId}</p>
      <p style={{ margin: "0", color: "#FF9600" }}>
        ★★★★★
        <span style={{ color: "#BBBBBB", fontSize: "0.7rem" }}>2023.03.26</span>
      </p>
      <span>{data.content}</span>
      <hr style={{ marginTop: "7%", borderColor: "#C1C1C1", opacity: "0.2" }} />
    </div>
  );
}

export default MarkerDetailReview;
