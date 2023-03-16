/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import MyVehicleRegistration from "./routes/userUseFnc/MyVehicleRegistration";
import { QueryClientProvider, QueryClient } from "react-query";
import Nav from "./routes/Nav";
import TestHome from "./routes/TestHome";
import VehiclePurchase from "./routes/userUseFnc/VehiclePurchase";
import Signup from "./routes/Signup";
import TermsOfUse from "./routes/TermsOfUse";
import UserHome from "./routes/UserHome";

const globalStyles = css`
  body {
    width: 100vw;
    background-color: #ffffff !important;
    font-family: "Open Sans", sans-serif;
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
            <Route path="/" element={<UserHome />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route
              path="/myvehicle/registration"
              element={<MyVehicleRegistration />}
            ></Route>
            <Route
              path="/vehicle/purchase"
              element={<VehiclePurchase />}
            ></Route>
            <Route path="/termsofuse" element={<TermsOfUse />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
