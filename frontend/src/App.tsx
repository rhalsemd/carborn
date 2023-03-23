/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./routes/auth/Login";
import MyVehicleRegistration from "./routes/userUseFnc/MyVehicleRegistration";
import { QueryClientProvider, QueryClient } from "react-query";
import VehiclePurchase from "./routes/userUseFnc/VehiclePurchase";
import Signup from "./routes/auth/Signup";
import UserHome from "./routes/userUseFnc/UserHome";
import GarageHome from "./routes/company/garage/GarageHome";
import InspectorHome from "./routes/company/inspector/InspectorHome";
import InsuranceHome from "./routes/company/insurance/InsuranceHome";
import VehiclePurchaseDetail from "./routes/userUseFnc/VehiclePurchaseDetail";
import BookList from "./routes/company/BookList";
import ViewHistory from "./routes/company/ViewHistory";
import SaleRegistration from "./routes/userUseFnc/SaleRegistration";
import Register from "./routes/company/Register";
import TermsOfUse from "./routes/auth/TermsOfUse";
import Searchid from "./routes/auth/SearchID";
import SearchidComplete from "./routes/auth/SearchidComplete";
import PasswordResetCheck from "./routes/auth/PasswordResetCheck";
import PasswordReset from "./routes/auth/PasswordReset";
import PasswordComplete from "./routes/auth/PasswordComplete";
import MyPage from "./routes/MyPage";
import MyCarInfo from "./components/MyPage/MyCarInfo";
import Booking from "./components/MyPage/Booking";
import Repair from "./components/MyPage/Repair";
import MyGallery from "./components/MyPage/MyGallery";
import BuyContent from "./components/MyPage/BuyContent";
import SellContent from "./components/MyPage/SellContent";
import Insurance from "./components/MyPage/Insurance";
import UserWithdrawal from "./components/MyPage/UserWithdrawal";
import PasswordModify from "./components/MyPage/PasswordModify";

const globalStyles = css`
  body {
    font-family: "Open Sans", sans-serif;
    margin: 0;
    padding: 0 0 0 0;
  }
`;

const queryClient = new QueryClient();

// 경로 지정
const routes = [
  { path: "/", element: <UserHome /> },
  { path: "/login", element: <Login /> },
  { path: "/termsofuse", element: <TermsOfUse /> },
  { path: "/signup", element: <Signup /> },
  { path: "/searchid", element: <Searchid /> },
  { path: "/searchid/searchidcomplete", element: <SearchidComplete /> },
  { path: "/passwordresetcheck", element: <PasswordResetCheck /> },
  { path: "/passwordresetcheck/passwordreset", element: <PasswordReset /> },
  {
    path: "/passwordresetcheck/passwordreset/passwordcomplete",
    element: <PasswordComplete />,
  },
  { path: "/:userid/mypage", element: <MyPage /> },
  { path: "/:userid/mypage/mycarinfo", element: <MyCarInfo /> },
  { path: "/:userid/mypage/booking", element: <Booking /> },
  { path: "/:userid/mypage/repair", element: <Repair /> },
  { path: "/:userid/mypage/gallery", element: <MyGallery /> },
  { path: "/:userid/mypage/buycontent", element: <BuyContent /> },
  { path: "/:userid/mypage/sellcontent", element: <SellContent /> },
  { path: "/:userid/mypage/insurance", element: <Insurance /> },
  { path: "/:userid/mypage/userwithdrawal", element: <UserWithdrawal /> },
  { path: "/:userid/mypage/passwordmodify", element: <PasswordModify /> },
  { path: "/garage", element: <GarageHome /> },
  { path: "/garage/reserve", element: <BookList /> },
  { path: "/garage/history", element: <ViewHistory /> },
  { path: "/garage/register", element: <Register /> },
  { path: "/inspector", element: <InspectorHome /> },
  { path: "/inspector/reserve", element: <BookList /> },
  { path: "/inspector/register", element: <Register /> },
  { path: "/insurance", element: <InsuranceHome /> },
  { path: "/user/car", element: <MyVehicleRegistration /> },
  { path: "/user/car/list", element: <VehiclePurchase /> },
  { path: "/user/car/:carId", element: <VehiclePurchaseDetail /> },
  { path: "/user/car/sale", element: <SaleRegistration /> },
];

function App() {
  return (
    // <div className="App"></div>
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles}></Global>
        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
