import { call, put, takeEvery } from "redux-saga/effects";

import * as statusCode from "../constants/statusCode";
import { addComment } from "../apis/comment";
import * as commentConstant from "../constants/comment";
import { addCommentSuccess, addCommentFail } from "../actions/comment";

function* addCommentSaga({ payload }) {
  try {
    const { postId, content, callback } = payload;

    const res = yield call(addComment, {
      postId,
      content,
    });

    const { status, data } = res;
    if (status === statusCode.SUCCESS) {
      yield put(addCommentSuccess(data.comment));
      yield put(callback);
    }
  } catch (err) {
    yield put(addCommentFail(err.response.data.message));
  }
}

function* sagas() {
  yield takeEvery(commentConstant.ADD_COMMENT, addCommentSaga);
}

export default sagas;
