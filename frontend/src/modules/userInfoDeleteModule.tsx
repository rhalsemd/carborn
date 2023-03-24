import axios from "axios";
import { call, put } from "redux-saga/effects";
import { DeleteUserApi, API_URL } from "../lib/api";

// 액션 타입 이름
export const USERINFO_DELETE = "userinfo/delete";
export const USERINFO_DELETE_SUCCESS = "userinfo/deleteSuccess";
export const USERINFO_DELETE_FAILURE = "userinfo/deleteFailure";

// 액션 생성 함수
export const userinfoDelete = () => ({
  type: USERINFO_DELETE,
});

export const userinfoDeleteSuccess = () => ({
  type: USERINFO_DELETE_SUCCESS,
});

export const userinfoDeleteFailure = (error:string) => ({
  type: USERINFO_DELETE_FAILURE,
  payload: {
    error,
  },
});

// 초기값(리듀서)
const initialState = {
  isLoading: false,
  response: null,
  error: null,
};

// 사가
// 유저 정보 삭제 사가
export function* userinfoDeleteSaga(): Generator<any, any, any> {
  // 테스트용 (이건 실패)
  // const userid = sessionStorage.getItem('userId')

  // 테스트용 (이건 성공)
  const id = 15;
  const userinfoDeleteApi = async () => {
    try {
      sessionStorage.removeItem("login-token");
      sessionStorage.removeItem("userId");

      const response = await axios({
        method: "DELETE",
        // url: `${API_URL}/users/${userid}`,
        url: `${API_URL}/users/${id}`,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  try {
    const response = yield call<any>(DeleteUserApi);
    yield put({ type: USERINFO_DELETE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: USERINFO_DELETE_FAILURE });
    console.error(error);
  }
}

export function userinfoDeleteReducer(
  state = initialState,
  action: { type: string; payload: object }
) {
  switch (action.type) {
    case USERINFO_DELETE:
      return { ...state, isLoading: true, error: null };
    case USERINFO_DELETE_SUCCESS:
      return { ...state, isLoading: false, success: true };
    case USERINFO_DELETE_FAILURE:
      return { ...state, isLoading: false };
    // case DELETE_USER_SUCCESS_RESET:
    //   return { ...state, success: false };
    default:
      return state;
  }
}
