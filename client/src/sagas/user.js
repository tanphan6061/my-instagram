import { call, put, delay, takeLatest, takeEvery } from "redux-saga/effects";

import * as statusCode from "../constants/statusCode";
import {
  getProfile,
  getProfileUser,
  search,
  follow,
  getFollowerApi,
} from "../apis/user";
import * as userConstants from "../constants/user";
import {
  getProfileSuccess,
  getProfileFail,
  getProfileUserSuccess,
  getProfileUserFail,
  searchSuccess,
  followSuccess,
  followFail,
  getFollower,
  getFollowerSuccess,
  getFollowerFail,
} from "../actions/user";
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

function* getProfileSaga() {
  try {
    const res = yield call(getProfile);

    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(getProfileSuccess(data.user));
      yield put(getFollower(data.user._id));
    }
  } catch (err) {
    if (err.response.status === 401) {
      yield* refreshTokenSaga();
      return;
    }
    yield put(getProfileFail(err.response.data.message));
  }
}

function* getProfileUserSaga({ payload }) {
  try {
    const { username } = payload;
    const res = yield call(getProfileUser, { username });

    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(getProfileUserSuccess(data.user));
    }
  } catch (err) {
    if (err.response.status === 401) {
      yield* refreshTokenSaga();
      return;
    }
    yield put(getProfileUserFail(err.response.data.message));
  }
}

function* searchSaga({ payload }) {
  try {
    yield delay(1000);
    const { q } = payload;

    const res = yield call(search, { q });
    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(searchSuccess(data.users));
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
}

function* followSaga({ payload }) {
  try {
    const { id } = payload;

    const res = yield call(follow, { userId: id });
    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(followSuccess(data.action));
    }
  } catch (err) {
    yield put(followFail(err.response.data.message));
  }
}

function* getFollowerSaga({ payload }) {
  try {
    const { id } = payload;

    const res = yield call(getFollowerApi, { userId: id });
    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(getFollowerSuccess(data[0].followers));
    }
  } catch (err) {
    yield put(getFollowerFail(err.response.data.message));
  }
}

function* sagas() {
  yield takeEvery(userConstants.GET_PROFILE, getProfileSaga);
  yield takeEvery(userConstants.GET_PROFILE_USER, getProfileUserSaga);
  yield takeLatest(userConstants.SEARCH, searchSaga);
  yield takeLatest(userConstants.FOLLOW, followSaga);
  yield takeLatest(userConstants.GET_FOLLOWER, getFollowerSaga);
}

export default sagas;
