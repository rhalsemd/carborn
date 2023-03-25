/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import MyVehicleRegistration from "./routes/userUseFnc/MyVehicleRegistration";
import VehiclePurchase from "./routes/userUseFnc/VehiclePurchase";
import Signup from "./routes/auth/SignupPage";
import UserHome from "./routes/userUseFnc/UserHome";
import GarageHome from "./routes/company/garage/GarageHome";
import InspectorHome from "./routes/company/inspector/InspectorHome";
import InsuranceHome from "./routes/company/insurance/InsuranceHome";
import VehiclePurchaseDetail from "./routes/userUseFnc/VehiclePurchaseDetail";
import Searchid from "./routes/auth/SearchID";
import SearchidComplete from "./routes/auth/SearchidComplete";
import PasswordResetCheck from "./routes/auth/PasswordResetCheck";
import PasswordComplete from "./routes/auth/PasswordComplete";
import MyPage from "./routes/MyPage";
import MyCarInfo from "./components/MyPage/MyCarInfo";
import Repair from "./components/MyPage/Repair";
import MyGallery from "./components/MyPage/MyGallery";
import BuyContent from "./components/MyPage/BuyContent";
import SellContent from "./components/MyPage/SellContent";
import Insurance from "./components/MyPage/Insurance";
import UserWithdrawal from "./components/MyPage/UserWithdrawal";
import PasswordModify from "./components/MyPage/PasswordModify";
import LoginPages from "./routes/auth/LoginPage";
import GetAgreementPage from "./routes/auth/GetAgreementPage";
import NewPasswordReset from "./routes/auth/NewPasswordReset";
import InspectorContent from "./components/MyPage/InspectorContent";
import MyInspectorDetail from "./components/MyPage/DetailComponent/MyInspectorDetail";
import MyInspectorBookDetail from './components/MyPage/DetailComponent/MyInspectorBookDetail';

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
  { path: "/login", element: <LoginPages /> },
  { path: "/getagreement", element: <GetAgreementPage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/searchid", element: <Searchid /> },
  { path: "/searchid/searchidcomplete", element: <SearchidComplete /> },
  { path: "/passwordresetcheck", element: <PasswordResetCheck /> },
  { path: "/passwordresetcheck/passwordreset", element: <NewPasswordReset /> },
  {
    path: "/passwordresetcheck/passwordreset/passwordcomplete",
    element: <PasswordComplete />,
  },
  { path: "/:userid/mypage", element: <MyPage /> },
  { path: "/:userid/mypage/mycarinfo", element: <MyCarInfo /> },
  { path: "/:userid/mypage/inspector", element: <InspectorContent /> },
  { path: "/:userid/mypage/inspector/:carId/completedetail", element: <MyInspectorDetail /> },
  { path: "/:userid/mypage/inspector/:carId/bookdetail", element: <MyInspectorBookDetail /> },
  { path: "/:userid/mypage/repair", element: <Repair /> },
  { path: "/:userid/mypage/gallery", element: <MyGallery /> },
  { path: "/:userid/mypage/buycontent", element: <BuyContent /> },
  { path: "/:userid/mypage/sellcontent", element: <SellContent /> },
  { path: "/:userid/mypage/insurance", element: <Insurance /> },
  { path: "/:userid/mypage/userwithdrawal", element: <UserWithdrawal /> },
  { path: "/:userid/mypage/passwordmodify", element: <PasswordModify /> },
  { path: "/garage", element: <GarageHome /> },
  { path: "/inspector", element: <InspectorHome /> },
  { path: "/insurance", element: <InsuranceHome /> },
  { path: "/user/car", element: <MyVehicleRegistration /> },
  { path: "/user/car/list", element: <VehiclePurchase /> },
  { path: "/user/car/:carId", element: <VehiclePurchaseDetail /> },
];

function App() {
  return (
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
