import { combineReducers } from "redux";
import { LoginOutReducer } from "../takeLoginLogoutModule";
import { SignUpReducer } from "../signUpModule";
import { GetAgreementReducer } from "../getAgreementModule";
import { verificationNumberReducer } from "../verificationNumberModule";
import { passwordResetCheckReducer } from "../PasswordCheckModule";
import { userinfoDeleteReducer } from "../userInfoDeleteModule";
import { setAccountTypeReducer } from "./../setAccountTypeModule";
import { IdCheckReducer } from "./../UserIdCheckModule";
import { SearchIDCheckReducer } from "../SearchIDModule";
import { newPasswordReducer } from './../PasswordResetModule';

const rootReducer = combineReducers({
  LoginOutReducer,
  GetAgreementReducer,
  SignUpReducer,
  IdCheckReducer,
  setAccountTypeReducer,
  SearchIDCheckReducer,
  verificationNumberReducer,
  newPasswordReducer,
  passwordResetCheckReducer,
  userinfodelete: userinfoDeleteReducer,
});

export default rootReducer;
