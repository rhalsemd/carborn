import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { call, put } from "redux-saga/effects";
import { API_URL, loginApi } from "../lib/loginApi";

// 액션 타입 정의
export interface LoginTryAction {
  type: string;
  payload: User;
}

// 타입 지정
export interface User {
  userid?: string;
  userpassword?: string;
  captcha? : string;
}

// 액션 타입 이름
export const LOGIN_TRY = "LOGIN_TRY";
export const LOGIN_TRY_SUCCESS = "LOGIN_TRY_SUCCESS";
export const GET_USER_TOKEN = "GET_USER_TOKEN";
export const LOGOUT = "LOGOUT"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

// 액션 타입 생성 함수
export const loginTry = (user: User) => ({
  type: LOGIN_TRY,
  payload: user,
});

export const loginTrySuccess = (user: User) => ({
  type: LOGIN_TRY_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT
})

// 초기값
const initialState = {
  users: [],
  loggedIn: false,
};

// 로그인 사가
export function* loginSaga(action: LoginTryAction) {
  try {
    const response: User = yield call<typeof loginApi>(loginApi, action.payload);
    // 얘를 토큰 대신으로 쓰자.
    // console.log(response.captcha)
    const isToken = response.captcha

    if (isToken) {
      const obj = {
        // 이거 나중에 토큰으로 바꿔야함
        value: response.captcha,
        expire: Date.now() + 1800000,
        userId: response.userid,
      };

      // 객체를 JSON 문자열로 변환
      const objString = JSON.stringify(obj);
      sessionStorage.setItem("login-token", objString);

      yield put({
        type: GET_USER_TOKEN,
        success: true,
      });
    }  

    yield put({
      type: LOGIN_TRY_SUCCESS, 
      payload: { ...response, success: true }
    });
  } catch (error) {
    console.log(error);
  }
}

// 로그아웃 사가
export function* logoutSaga() {
  try {
    // 액션 요청을 통해서 리듀서의 로그인 관련 정보를 리셋한다.
    // yield axios({
    //   method: "DELETE",
    //   url: `${API_URL}/logout`,
    // });

    // 먼저 세션 스토리지에 있는 정보부터 지운다.
    yield sessionStorage.removeItem("login-token");
    yield sessionStorage.removeItem("userId");

    put({ type: LOGOUT_SUCCESS })
  } catch (error) {
    console.log(error);
  }
}

// 리듀서
export function loginReducer(state = initialState, action: { payload: any, type: string }) {
  switch (action.type) {
    case LOGIN_TRY_SUCCESS:
      return { ...state, users : action.payload, loggedIn: true };
    case LOGOUT_SUCCESS:
      return { ...state, users : [], loggedIn: false };
    default:
      return state;
  }
}
