import { combineReducers } from "redux";
import { LoginOutReducer } from "../takeLoginLogoutModule";
import { SignUpReducer } from "../signUpModule";
import { GetAgreementReducer } from "../getAgreementModule";
import { verificationNumberReducer } from "../verificationNumberModule";
import { passwordResetCheckReducer } from "../PasswordCheckModule";
import { userinfoDeleteReducer } from "../userInfoDeleteModule";
import { setAccountTypeReducer } from "./../setAccountTypeModule";
import { IdCheckReducer } from "./../UserIdCheckModule";
import { searchIDCheckReducer } from "../searchidModule";
import { newPasswordReducer } from './../newPasswordModule';
import { createReviewReducer } from './../createReviewModule';

const rootReducer = combineReducers({
  LoginOutReducer,
  GetAgreementReducer,
  SignUpReducer,
  IdCheckReducer,
  setAccountTypeReducer,
  searchIDCheckReducer,
  verificationNumberReducer,
  newPasswordReducer,
  passwordResetCheckReducer,
  createReviewReducer,
  userinfodelete: userinfoDeleteReducer,
});

export default rootReducer;
