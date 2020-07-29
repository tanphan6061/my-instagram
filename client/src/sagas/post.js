import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import * as statusCode from "../constants/statusCode";
import {
  fetchListPostsFollowing,
  likePost,
  getDetailPost,
  createPost,
} from "../apis/post";
import * as postConstants from "../constants/post";
import {
  fetchPostsFollowingSuccess,
  fetchPostsFollowingFail,
  getDetailPostSuccess,
  getDetailPostFail,
  likePostSuccess,
  likePostFail,
  createPostSuccess,
  createPostFail,
} from "../actions/post";
import { refreshToken } from "../apis/auth";
import { refreshTokenSuccess, refreshTokenFail } from "../actions/auth";

function* refreshTokenSaga() {
  try {
    const token = localStorage.getItem("refreshToken");
    const res = yield call(refreshToken, { token });
    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(refreshTokenSuccess(data));
    }
  } catch (err) {
    yield put(refreshTokenFail(err.response.data.message));
  }
}

function* fetchPostsFollowingSaga() {
  try {
    const res = yield call(fetchListPostsFollowing);

    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(fetchPostsFollowingSuccess(data));
    }
  } catch (err) {
    if (err.response.status === 401) {
      yield* refreshTokenSaga();
      return;
    }
    yield put(fetchPostsFollowingFail(err.response.data.message));
  }
}

function* getDetailPostSaga({ payload }) {
  try {
    const { postId } = payload;
    const res = yield call(getDetailPost, {
      postId,
    });

    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(getDetailPostSuccess(data));
    }
  } catch (err) {
    if (err.response.status === 401) {
      yield* refreshTokenSaga();
      return;
    }
    yield put(getDetailPostFail(err.response.data.message));
  }
}

function* likePostSaga({ payload }) {
  try {
    const { postId, callback } = payload;
    const res = yield call(likePost, { postId });
    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(likePostSuccess(data));
      yield put(callback);
    }
  } catch (err) {
    yield put(likePostFail(err.response.data.message));
  }
}

function* createPostSaga({ payload }) {
  try {
    const res = yield call(createPost, payload.data);
    const { status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(createPostSuccess());
    }
  } catch (err) {
    yield put(createPostFail(err.response.data.message));
  }
}

function* sagas() {
  yield takeEvery(postConstants.FETCH_POSTS_FOLLOWING, fetchPostsFollowingSaga);
  yield takeEvery(postConstants.GET_DETAIL_POST, getDetailPostSaga);
  yield takeEvery(postConstants.LIKE_POST, likePostSaga);
  yield takeLatest(postConstants.CREATE_POST, createPostSaga);
}

export default sagas;
