// 액션 이름 생성
export const SIGNUP_CHECK = "SIGNUP_CHECK";

// 액션 생성 함수
export const SetIsSignupAction = (isSignUp: Object) => ({
  type: SIGNUP_CHECK,
  payload: isSignUp,
});

// 초기값
const initialState = {
  success: false,
};

// 리듀서
export function SignUpReducer(state = initialState, action: any) {
  switch (action.type) {
    case SIGNUP_CHECK:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}
