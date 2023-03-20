import { combineReducers } from "redux";
import { loginReducer } from "../loginModule";
import { idCheckReducer } from "../idcheckModule";
import { termsofuseReducer } from "../termsOfUseModule";
import { verificationNumberReducer } from "../verificationNumberModule";
import { searchidCheckReducer } from "../searchIDModule";
import { passwordResetCheckReducer } from "../passwordResetCheckModule";
import { passwordResetReducer } from "../passwordResetModule";

// 타입 지정
// export type RootState = ReturnType<typeof rootReducer>

export type RootState = {
  termsofuse: {
    privacy: string;
    website: string;
  };
};

const rootReducer = combineReducers({
  login: loginReducer,
  termsofuse: termsofuseReducer,
  idcheck: idCheckReducer,
  verificationNumber: verificationNumberReducer,
  searchid: searchidCheckReducer,
  passwordResetCheck: passwordResetCheckReducer,
  passwordReset: passwordResetReducer
});

export default rootReducer;
