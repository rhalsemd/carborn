import { call, put, takeLatest } from "redux-saga/effects";
import { companyverificationNumberApi, userverificationNumberApi } from "../lib/userverificationNumberApi";

type State = {
  phonenum: string
}

// 액션 타입 이름
export const USER_VERIFICATION_CHECK = "USER_VERIFICATION_CHECK";
export const USER_VERIFICATION_CHECK_SUCCESS = "USER_VERIFICATION_CHECK_SUCCESS";
export const USER_VERIFICATION_CHECK_FAILURE = "USER_VERIFICATION_CHECK_FAILURE";
export const COMPANY_VERIFICATION_CHECK = "COMPANY_VERIFICATION_CHECK";
export const COMPANY_VERIFICATION_CHECK_SUCCESS = "COMPANY_VERIFICATION_CHECK_SUCCESS";
export const COMPANY_VERIFICATION_CHECK_FAILURE = "COMPANY_VERIFICATION_CHECK_FAILURE";

// 액션 생성 함수
export const userverificationNumber = (phonenum: string) => ({
  type: USER_VERIFICATION_CHECK,
  payload: phonenum,
});

export const companyverificationNumber = (phonenum: string) => ({
  type: COMPANY_VERIFICATION_CHECK,
  payload: phonenum,
});

// 초기값
const initialState:State = {
  phonenum: ''
}

// 유저 휴대전화 인증번호
export function* userverificationNumberFnc(
  action: ReturnType<typeof userverificationNumber>
): Generator<any, any, any>{
  try {
    const response = yield call(userverificationNumberApi, action.payload)
    const { authenticatednumber } = response;
    yield put({
      type: USER_VERIFICATION_CHECK_SUCCESS,
      payload: authenticatednumber
    })
  } catch (error) {
    console.log(error);
  }
}

// 회사 휴대전화 인증번호
export function* companyverificationNumberFnc(
  action: ReturnType<typeof companyverificationNumber>
): Generator<any, any, any>{
  try {
    const response = yield call(companyverificationNumberApi, action.payload)
    const { authenticatednumber } = response;
    yield put({
      type: COMPANY_VERIFICATION_CHECK_SUCCESS,
      payload: authenticatednumber
    })
  } catch (error) {
    console.log(error);
  }
}

// 인증번호 관련 사가
export function* verificationNumberSaga() {
  yield takeLatest(USER_VERIFICATION_CHECK, userverificationNumberFnc)
  yield takeLatest(COMPANY_VERIFICATION_CHECK, companyverificationNumberFnc)
}

//리듀서
export function verificationNumberReducer(
  state = initialState,
  action: { type: string; payload: object }
) {
  switch(action.type) {
    case USER_VERIFICATION_CHECK_SUCCESS:
      return {...state, ...action.payload };
    case COMPANY_VERIFICATION_CHECK_SUCCESS:
      return {...state, ...action.payload };
    default:
      return state
  }
}