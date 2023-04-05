/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { JustRoutes, PrivateRoutes } from "./routes";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { LoginOutReducer } from "./modules/takeLoginLogoutModule";

const globalStyles = css`
  body {
    font-family: "Open Sans", sans-serif;
    margin: 0;
    padding: 0 0 0 0;
    user-select: none;
  }
`;

const queryClient = new QueryClient();

// 라우팅 가드 조건 컴포넌트
export const PrivateRoute = ({
  children: Component,
  isLoggedIn,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={(props: any) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Navigate to={{ pathname: "/login" }} />
      )
    }
  />
);

function App() {
  // 토큰 가져오기
  const { success } = useSelector((state: any) => state.LoginOutReducer);
  const ObjString: any = localStorage.getItem("login-token");
  const token = JSON.parse(ObjString);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles}></Global>
        <Router>
          <Routes>
            {/* 로그인 안해도 되는 페이지 및 컴포넌트 */}
            {JustRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {/* 로그인 해야만 이용가능한 페이지 */}
            {PrivateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  token ? (
                    route.element
                  ) : (
                    <Navigate to={{ pathname: "/login" }} />
                  )
                }
              />
            ))}
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
