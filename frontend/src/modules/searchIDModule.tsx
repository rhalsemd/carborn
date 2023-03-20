import { call, put } from "redux-saga/effects";
import { searchidCheckApi } from "../lib/searchIDApi";

// 액션 타입 이름
export const SEARCHID_CHECK = "SEARCHID_CHECK";
export const SEARCHID_CHECK_SUCCESS = "SEARCHID_CHECK_SUCCESS";

// 액션 생성 함수
export const searchidCheck = (data: Object) => ({
  type: SEARCHID_CHECK,
  payload: data,
});

// 초기값
const initialState = {
  name: "",
  phonenumber: "",
  isVerify: false,
};

//사가
// 유저 아이디 중복 체크
export function* searchidCheckSaga(
  action: ReturnType<typeof searchidCheck>
): Generator<any, any, any> {
  try {
    const response = yield call<any>(searchidCheckApi, action.payload);
    yield put({ type: SEARCHID_CHECK_SUCCESS, payload: response})
  } catch (error) {
    console.log(error);
  }
}

export function searchidCheckReducer(
  state = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case SEARCHID_CHECK_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
