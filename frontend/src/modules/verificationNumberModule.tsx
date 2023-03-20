import { call, put } from "redux-saga/effects";
import {
  companyverificationNumberApi,
  userverificationNumberApi,
} from "../lib/userverificationNumberApi";

type State = {
  certifiedNumber: string;
};

// 액션 타입 이름
export const USER_VERIFICATION_CHECK_REQUEST = "USER_VERIFICATION_CHECK_REQUEST";
export const USER_VERIFICATION_CHECK_SUCCESS =
  "USER_VERIFICATION_CHECK_SUCCESS";
export const USER_VERIFICATION_CHECK_FAILURE =
  "USER_VERIFICATION_CHECK_FAILURE";

export const COMPANY_VERIFICATION_CHECK_REQUEST = "COMPANY_VERIFICATION_CHECK_REQUEST";
export const COMPANY_VERIFICATION_CHECK_SUCCESS =
  "COMPANY_VERIFICATION_CHECK_SUCCESS";
export const COMPANY_VERIFICATION_CHECK_FAILURE =
  "COMPANY_VERIFICATION_CHECK_FAILURE";

// 액션 생성 함수
export const userverificationNumber = (phoneNumber:string) => ({
  type: USER_VERIFICATION_CHECK_REQUEST,
  payload: phoneNumber
});

export const userverificationNumberSuccess = (certificatedNumber:string) => ({
  type: USER_VERIFICATION_CHECK_SUCCESS,
  payload: certificatedNumber,
});

export const userverificationNumberFailure = (error:any) => ({
  type: USER_VERIFICATION_CHECK_FAILURE,
  payload: error
})

export const companyverificationNumber = (phoneNumber:string) => ({
  type: COMPANY_VERIFICATION_CHECK_REQUEST,
  payload: phoneNumber
});

export const companyverificationNumberSuccess = (certificatedNumber:string) => ({
  type: USER_VERIFICATION_CHECK_SUCCESS,
  payload: certificatedNumber,
});

export const companyverificationNumberFailure = (error:any) => ({
  type: USER_VERIFICATION_CHECK_FAILURE,
  payload: error
})

// 초기값
const initialState: State = {
  certifiedNumber: "",
};

// 인증번호 관련 사가
// 유저 휴대전화 인증번호
export function* userverificationNumberSaga(
  action: ReturnType<typeof userverificationNumber>
): Generator<any, any, any> {
  try {
    const response = yield call(userverificationNumberApi, action.payload);
    yield put({ type: USER_VERIFICATION_CHECK_SUCCESS, payload: response });
  } catch (error) {
    console.log(error);
  }
}

// 회사 휴대전화 인증번호
export function* companyverificationNumberSaga(
  action: ReturnType<typeof companyverificationNumber>
): Generator<any, any, any> {
  try {
    const response = yield call(companyverificationNumberApi, action.payload);
    yield put({
      type: COMPANY_VERIFICATION_CHECK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
  }
}


//리듀서
export function verificationNumberReducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case USER_VERIFICATION_CHECK_SUCCESS:
      return { ...state, certificatedNum: action.payload.phoneNumber.slice(3, 9) };
    case COMPANY_VERIFICATION_CHECK_SUCCESS:
      return { ...state, certificatedNum: action.payload.phoneNumber.slice(3, 9) };
    default:
      return state;
  }
}
