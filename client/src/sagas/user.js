import { call, put, delay, takeLatest, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";

import * as statusCode from "../constants/statusCode";
import {
  getProfile,
  getProfileUser,
  search,
  follow,
  getFollowingApi,
  getFollowerApi,
  addAvatar,
  updateProfile,
  changePassword,
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
  getFollowing,
  getFollowingSuccess,
  getFollowingFail,
  getFollowingUser,
  getFollowingUserSuccess,
  getFollowingUserFail,
  getFollowerUser,
  getFollowerUserSuccess,
  getFollowerUserFail,
  addAvatarSuccess,
  addAvatarFail,
  updateProfileSuccess,
  updateProfileFail,
  changePasswordSuccess,
  changePasswordFail,
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
      yield put(getFollowing(data.user._id));
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
      yield put(getFollowingUser(data.user._id));
      yield put(getFollowerUser(data.user._id));
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
      yield put(getFollowing(id));
    }
  } catch (err) {
    yield put(followFail(err.response.data.message));
  }
}

function* getFollowingSaga({ payload }) {
  try {
    const { id } = payload;

    const res = yield call(getFollowingApi, { userId: id });
    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(getFollowingSuccess(data[0].followings));
    }
  } catch (err) {
    yield put(getFollowingFail(err.response.data.message));
  }
}

function* getFollowingUserSaga({ payload }) {
  try {
    const { id } = payload;

    const res = yield call(getFollowingApi, { userId: id });
    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(getFollowingUserSuccess(data[0].followings));
    }
  } catch (err) {
    yield put(getFollowingUserFail(err.response.data.message));
  }
}

function* getFollowerUserSaga({ payload }) {
  try {
    const { id } = payload;

    const res = yield call(getFollowerApi, { userId: id });
    const { data, status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(getFollowerUserSuccess(data[0].followers));
    }
  } catch (err) {
    yield put(getFollowerUserFail(err.response.data.message));
  }
}

function* addAvatarSaga({ payload }) {
  try {
    const { data } = payload;

    const res = yield call(addAvatar, data);
    const { status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(addAvatarSuccess());
    }
  } catch (err) {
    yield put(addAvatarFail(err.response?.data?.message));
  }
}

function* updateProfileSaga({ payload }) {
  try {
    const { username, fullname, email, date, gender } = payload;

    const res = yield call(updateProfile, {
      username,
      fullname,
      email,
      date,
      gender,
    });
    const { status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(updateProfileSuccess());
    }
  } catch (err) {
    yield put(updateProfileFail(err.response?.data?.message));
  }
}

function* changePasswordSaga({ payload }) {
  try {
    const { password, newPassword } = payload;

    const res = yield call(changePassword, {
      password,
      newPassword,
    });
    const { status } = res;
    if (status === statusCode.SUCCESS) {
      yield put(changePasswordSuccess());
      yield localStorage.clear();
      yield put(push("/login"));
    }
  } catch (err) {
    yield put(changePasswordFail(err.response?.data?.message));
  }
}

function* sagas() {
  yield takeEvery(userConstants.GET_PROFILE, getProfileSaga);
  yield takeEvery(userConstants.GET_PROFILE_USER, getProfileUserSaga);
  yield takeLatest(userConstants.SEARCH, searchSaga);
  yield takeLatest(userConstants.FOLLOW, followSaga);
  yield takeLatest(userConstants.GET_FOLLOWING, getFollowingSaga);
  yield takeLatest(userConstants.GET_FOLLOWING_USER, getFollowingUserSaga);
  yield takeLatest(userConstants.GET_FOLLOWER_USER, getFollowerUserSaga);
  yield takeEvery(userConstants.ADD_AVATAR, addAvatarSaga);
  yield takeEvery(userConstants.UPDATE_PROFILE, updateProfileSaga);
  yield takeEvery(userConstants.CHANGE_PASSWORD, changePasswordSaga);
}

export default sagas;
