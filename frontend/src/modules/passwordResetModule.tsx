import { call, put } from "redux-saga/effects";
import { passwordResetApi } from "../lib/passwordResetApi";

// 액션 타입 이름
export const PASSWORD_RESET = "PASSWORD_RESET";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";

// 액션 생성 함수
export const passwordReset = (data: Object) => ({
  type: PASSWORD_RESET,
  payload: data,
});

// 초기값
const initialState = {
  newpassword: "",
  newpasswordcheck: null,
};

// 사가
// 새로운 비밀번호 재설정 사가
export function* passwordResetSaga(
  action: ReturnType<typeof passwordReset>
): Generator<any, any, any> {
  try {
    const response = yield call<any>(passwordResetApi, action.payload);
    yield put({ type: PASSWORD_RESET_SUCCESS, payload: response})
  } catch (error) {
    console.log(error);
  }
}

export function passwordResetReducer(
  state = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case PASSWORD_RESET_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
