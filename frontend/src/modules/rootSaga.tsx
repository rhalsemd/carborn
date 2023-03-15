import { takeLatest } from "redux-saga/effects";
import { useridCheckSaga, USERID_CHECK } from "./idcheckModule";
import { loginSaga, LOGIN_TRY } from "./loginModule";
import { getTermsOfUseSaga, GET_TERMSOFUSE } from "./termsOfUseModule";

export function* rootSaga() {
  yield takeLatest(LOGIN_TRY, loginSaga);
  yield takeLatest(GET_TERMSOFUSE, getTermsOfUseSaga);
  yield takeLatest(USERID_CHECK, useridCheckSaga);
}
