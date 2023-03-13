/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./routes/Nav";
import Login from "./routes/Login";
import Test from "./routes/TestHome";

const globalStyles = css`
  body {
    background-color: #ffffff !important;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    margin: 0;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles}></Global>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Test />}></Route>
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
