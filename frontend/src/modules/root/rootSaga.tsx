import { takeEvery, takeLatest } from "redux-saga/effects";
import { companyidCheckSaga, COMPANYID_CHECK, useridCheckSaga, USERID_CHECK } from "../idcheckModule";
import { loginSaga, LOGIN_TRY, LOGOUT, logoutSaga } from "../loginModule";
import { passwordResetCheckSaga, PASSWORD_RESET_CHECK } from "../passwordResetCheckModule";
import { passwordResetSaga, PASSWORD_RESET } from "../passwordResetModule";
import { searchidCheckSaga, SEARCHID_CHECK } from "../searchIDModule";
import { getTermsOfUseSaga, GET_TERMSOFUSE } from "../termsOfUseModule";
import { companyverificationNumberSaga, COMPANY_VERIFICATION_CHECK_REQUEST, userverificationNumberSaga, USER_VERIFICATION_CHECK_REQUEST } from "../verificationNumberModule";

export default function* rootSaga() {
  yield takeLatest(GET_TERMSOFUSE, getTermsOfUseSaga)
  yield takeEvery(LOGIN_TRY, loginSaga)
  yield takeEvery(LOGOUT, logoutSaga);
  yield takeLatest(USERID_CHECK, useridCheckSaga)
  yield takeLatest(COMPANYID_CHECK, companyidCheckSaga)
  yield takeEvery(USER_VERIFICATION_CHECK_REQUEST, userverificationNumberSaga);
  yield takeEvery(COMPANY_VERIFICATION_CHECK_REQUEST, companyverificationNumberSaga);
  yield takeLatest(SEARCHID_CHECK, searchidCheckSaga);
  yield takeLatest(PASSWORD_RESET_CHECK, passwordResetCheckSaga);
  yield takeLatest(PASSWORD_RESET, passwordResetSaga);
}
