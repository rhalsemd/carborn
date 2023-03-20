import { call, put } from "redux-saga/effects";
import { getTermsOfUseApi } from "../lib/termsOfUseApi";

// 액션 타입 이름
export const GET_TERMSOFUSE = 'GET_TERMSOFUSE';
export const GET_TERMSOFUSE_SUCCESS = 'GET_TERMSOFUSE_SUCCESS';

// 액션 타입 생성 함수
export const getTermsOfUse = () => ({
  type: GET_TERMSOFUSE
});

// 액션 타입 생성 함수
export const getTermsOfUseSuccess = (termsofuse:object) => ({
  type: GET_TERMSOFUSE_SUCCESS,
  payload: termsofuse,
});

// 초기값
const initialState = {
  website: '',
  privacy: '',
};

// 이용약관 가져오기
// export function* getTermsOfUseFnc() {
//   try {
//     const termsofuse:object = yield call(getTermsOfUseApi);
//     yield put({ type: GET_TERMSOFUSE_SUCCESS, payload : { ...termsofuse }})
//   } catch (error) {
//     console.log(error)
//   }
// }

// 사가
export function* getTermsOfUseSaga() {
  try {
    const termsofuse:object = yield call(getTermsOfUseApi);
    yield put({ type: GET_TERMSOFUSE_SUCCESS, payload : { ...termsofuse }})
  } catch (error) {
    console.log(error)
  }
}

// 리듀서
export function termsofuseReducer(state=initialState, action: {type: string, payload: object}) {
  switch (action.type) {
    case GET_TERMSOFUSE_SUCCESS:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}