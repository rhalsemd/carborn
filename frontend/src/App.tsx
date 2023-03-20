/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./routes/Login";
import MyVehicleRegistration from "./routes/userUseFnc/MyVehicleRegistration";
import { QueryClientProvider, QueryClient } from "react-query";
import VehiclePurchase from "./routes/userUseFnc/VehiclePurchase";
import Signup from "./routes/Signup";
import UserHome from "./routes/userUseFnc/UserHome";
import GarageHome from "./routes/company/garage/GarageHome";
import InspectorHome from "./routes/company/inspector/InspectorHome";
import InsuranceHome from "./routes/company/insurance/InsuranceHome";
import VehiclePurchaseDetail from "./routes/userUseFnc/VehiclePurchaseDetail";
import TermsOfUse from "./routes/TermsOfUse";
import BookList from "./routes/company/garage/BookList";

const globalStyles = css`
  body {
    font-family: "Open Sans", sans-serif;
    margin: 0;
    padding: 0 0 0 0;
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
            <Route path="/" element={<UserHome />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/termsofuse" element={<TermsOfUse />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/garage" element={<GarageHome />} />
            <Route path="/garage/reserve" element={<BookList />} />

            <Route path="/inspector" element={<InspectorHome />} />

            <Route path="/insurance" element={<InsuranceHome />} />

            <Route path="/user/car" element={<MyVehicleRegistration />} />
            <Route path="/user/car/list" element={<VehiclePurchase />} />
            <Route
              path="/user/car/:carId"
              element={<VehiclePurchaseDetail />}
            ></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
