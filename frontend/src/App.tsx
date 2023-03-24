/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
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
import SearchidComplete from "./routes/auth/SearchIDComplete";
import PasswordResetCheck from "./routes/auth/PasswordResetCheck";
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
import LoginPages from "./routes/auth/LoginPage";
import GetAgreementPage from "./routes/auth/GetAgreementPage";
import NewPasswordReset from "./routes/auth/NewPassword";

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
  { path: "/:userid/mypage/booking", element: <Booking /> },
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
  // 토큰 만료 기한 확인 및 세션 스토리지에서 토큰 삭제
  function checkTokenExpiration() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodedToken: { [key: string]: any } = jwt_decode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("accessToken");
      }
    }
  }
  // 1분마다 토큰 만료 기한 확인
  setInterval(checkTokenExpiration, 60 * 1000);

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
