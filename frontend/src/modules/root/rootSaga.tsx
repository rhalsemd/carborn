import { takeEvery, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  takeLoginSaga,
  takeLogoutSaga,
} from "../takeLoginLogoutModule";
import { GetAgreementSaga, GET_TERMSOFUSE } from "../getAgreementModule";

import {
  CompanyIdCheckSaga,
  COMPANYID_CHECK,
  UserIdCheckSaga,
  USERID_CHECK,
} from "../UserIdCheckModule";
import {
  passwordResetCheckSaga,
  PASSWORD_RESET_CHECK,
} from "../PasswordCheckModule";
import { newPasswordSaga, NEWPASSWORD_REQUEST } from "../newPasswordModule";
import { searchidCheckSaga, SEARCHID_CHECK } from "../searchidModule";
import { companyverificationNumberSaga, COMPANY_VERIFICATION_CHECK_REQUEST, userverificationNumberSaga, USER_VERIFICATION_CHECK_REQUEST } from "../verificationNumberModule";
import { createReviewSaga, CREATE_REVIEW_REQUEST } from "../createReviewModule";


export default function* rootSaga() {
  yield takeEvery(LOGIN_REQUEST, takeLoginSaga);
  yield takeLatest(LOGOUT_REQUEST, takeLogoutSaga);
  yield takeEvery(GET_TERMSOFUSE, GetAgreementSaga);
  yield takeLatest(USERID_CHECK, UserIdCheckSaga);
  yield takeLatest(COMPANYID_CHECK, CompanyIdCheckSaga);
  yield takeLatest(SEARCHID_CHECK, searchidCheckSaga);

  yield takeEvery(USER_VERIFICATION_CHECK_REQUEST, userverificationNumberSaga);
  yield takeEvery(
    COMPANY_VERIFICATION_CHECK_REQUEST,
    companyverificationNumberSaga
  );
  yield takeLatest(PASSWORD_RESET_CHECK, passwordResetCheckSaga);
  yield takeLatest(NEWPASSWORD_REQUEST, newPasswordSaga);
  yield takeLatest(CREATE_REVIEW_REQUEST, createReviewSaga);
}
