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
import Searchid from "./routes/SearchID";
import SearchidComplete from "./routes/SearchidComplete";
import PasswordResetCheck from "./routes/PasswordResetCheck";
import PasswordReset from "./routes/PasswordReset";
import PasswordComplete from "./routes/PasswordComplete";
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
            <Route path="/" element={<UserHome />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/termsofuse" element={<TermsOfUse />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/searchid" element={<Searchid />}></Route>
            <Route
              path="/searchid/searchidcomplete"
              element={<SearchidComplete />}
            ></Route>
            <Route
              path="/passwordresetcheck"
              element={<PasswordResetCheck />}
            ></Route>
            <Route
              path="/passwordresetcheck/passwordreset"
              element={<PasswordReset />}
            ></Route>
            <Route
              path="/passwordresetcheck/passwordreset/passwordcomplete"
              element={<PasswordComplete />}
            ></Route>

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
