/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import MyVehicleRegistration from "./routes/userUseFnc/MyVehicleRegistration";
import { QueryClientProvider, QueryClient } from "react-query";
import VehiclePurchase from "./routes/userUseFnc/VehiclePurchase";
import Signup from "./routes/Signup";
import TermsOfUse from "./routes/TermsOfUse";
import UserHome from "./routes/userUseFnc/UserHome";
import GarageHome from "./routes/company/garage/GarageHome";
import InspectorHome from "./routes/company/inspector/InspectorHome";
import InsuranceHome from "./routes/company/insurance/InsuranceHome";

const globalStyles = css`
  body {
    font-family: "Open Sans", sans-serif;
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

            <Route path="/garage" element={<GarageHome />} />

            <Route path="/inspector" element={<InspectorHome />} />

            <Route path="/insurance" element={<InsuranceHome />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
