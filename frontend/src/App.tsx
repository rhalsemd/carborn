/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './routes/Login';
import MyVehicleRegistration from "./routes/MyVehicleRegistration";
import { QueryClientProvider, QueryClient } from "react-query";
import Test from "./routes/TestHome";
import Nav from './routes/Nav';
import TestHome from './routes/TestHome';

const globalStyles = css`
  body {
    background-color: #ffffff !important;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    margin: 0;
  }
`;

const queryClient = new QueryClient();

function App() {
  return (
    // <div className="App"></div>
    <>
      <QueryClientProvider client={queryClient}>

      <Global styles={globalStyles}></Global>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<TestHome />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/myvehicle/registration" element={<MyVehicleRegistration />}
        ></Route>
        </Routes>
      </Router>
      </QueryClientProvider>

    </>
  );
}

export default App;
