import { call, put } from "redux-saga/effects";
import { createReviewApi } from './../lib/api';

// 액션 이름
export const CREATE_REVIEW_REQUEST = "CREATE_REVIEW_REQUEST";
export const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";

export const createReviewAction = ({reviewInput, rating, carId}: any) => ({
  type: CREATE_REVIEW_REQUEST,
  payload: { reviewInput, rating, carId },
});

// 리뷰 보내기 사가
export function* createReviewSaga(
  action: ReturnType<typeof createReviewAction>
): Generator<any, any, any> {
  try {
    const response = yield call(createReviewApi, action.payload)
    yield put({
      type: CREATE_REVIEW_SUCCESS,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
}

export function createReviewReducer(
  state = { isReview: false },
  action: { type: string; payload: any}
) {
  switch (action.type) {
    case CREATE_REVIEW_SUCCESS:
      return { ...state, ...action.payload, isReview:true}
    default:
      return state;
  }
}