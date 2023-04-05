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

const globalStyles = css`
  body {
    font-family: "Open Sans", sans-serif;
    margin: 0;
    padding: 0 0 0 0;
    user-select: none;
  }
  .swal-button--confirm {
    padding: 7px 19px;
    border-radius: 2px;
    background-color: red;
    font-size: 14px;
    border: 1px solid #ff0000;
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
  }

  .swal-modal {
    width: 25%;
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
  const ObjString: string | null = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const Token = Obj ? Obj.value : null;

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
                  Token ? (
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
