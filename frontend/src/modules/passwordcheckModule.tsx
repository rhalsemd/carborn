import { call, put } from "redux-saga/effects";
import { companypasswordCheckApi, userpasswordCheckApi } from "../lib/passwordCheckApi";

// 액션 타입 이름
export const USER_PASSWORD_CHECK = "USER_PASSWORD_CHECK";
export const USER_PASSWORD_CHECK_SUCCESS = "USER_PASSWORD_CHECK_SUCCESS";
export const USER_PASSWORD_CHECK_FAILURE = "USER_PASSWORD_CHECK_FAILURE";
export const COMPANY_PASSWORD_CHECK = "COMPANY_PASSWORD_CHECK";
export const COMPANY_PASSWORD_CHECK_SUCCESS = "COMPANY_PASSWORD_CHECK_SUCCESS";
export const COMPANY_PASSWORD_CHECK_FAILURE = "COMPANY_PASSWORD_CHECK_FAILURE";

// 액션 생성 함수
export const userpasswordCheck = (password: string) => ({
  type: USER_PASSWORD_CHECK,
  payload: password,
});

export const companyidCheck = (password: string) => ({
  type: COMPANY_PASSWORD_CHECK,
  payload: password,
});

// 초기값
const initialState = {
  idcheck: false,
};

//사가
export function* userpasswordCheckSaga(
  action: ReturnType<typeof userpasswordCheck>
): Generator<any, any, any> {
  try {
    const response = yield call(userpasswordCheckApi, action.payload);
    // console.log(response);
    const success = response.success;
    if (success) {
      yield put({ 
        type: USER_PASSWORD_CHECK_FAILURE, 
        payload: { success: success }
      });
    } else {
      yield put({ 
        type: USER_PASSWORD_CHECK_SUCCESS, 
        payload: { success: success }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* companypasswordCheckSaga(
  action: ReturnType<typeof companyidCheck>
): Generator<any, any, any> {
  try {
    const response = yield call(companypasswordCheckApi, action.payload);
    // console.log(response);
    const success = response.success;
    if (success) {
      yield put({
        type: COMPANY_PASSWORD_CHECK_FAILURE,
        payload: { success: success },
      });
    } else {
      yield put({
        type: COMPANY_PASSWORD_CHECK_SUCCESS,
        payload: { success: success },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function useridCheckReducer(
  state = initialState,
  action: { type: string; payload: { success: boolean } }
) {
  switch (action.type) {
    case USER_PASSWORD_CHECK_SUCCESS:
      return { ...state, useridcheck: action.payload.success };
    case USER_PASSWORD_CHECK_FAILURE:
      return { ...state, useridcheck: action.payload.success };
    case COMPANY_PASSWORD_CHECK_SUCCESS:
      return { ...state, useridcheck: action.payload.success };
    case COMPANY_PASSWORD_CHECK_FAILURE:
      return { ...state, useridcheck: action.payload.success };
    default:
      return state;
  }
}
