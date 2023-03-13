import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [hello, setHello] = useState<string>("아직 안옴");

  useEffect(() => {
    axios
      .get("http://localhost/api/hello")
      .then((response: any) => setHello(response.data))
      .catch((error: any) => console.log(error));
  }, []);

  return <div>백엔드에서 가져온 데이터입니다 : {hello}</div>;
}

export default App;
