import { all } from "axios";
import { idCheckSaga } from "../idcheckModule";
import { loginSaga } from "../loginModule";
import { getTermsOfUseSaga } from "../termsOfUseModule";
import { verificationNumberSaga } from "../verificationNumberModule";

export function* rootSaga() {
  yield all([
    loginSaga(),
    getTermsOfUseSaga(),
    idCheckSaga(),
    verificationNumberSaga(),
  ])
}
