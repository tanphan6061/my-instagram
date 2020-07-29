import { call, put, delay, takeEvery } from "redux-saga/effects";
import { push } from "connected-react-router";

import * as statusCode from "../constants/statusCode";
import { login, logout, register, verify, resendCode } from "../apis/auth";
import * as authConstants from "../constants/auth";
import {
  loginSuccess,
  loginFail,
  checkAuth,
  registerSuccess,
  registerFail,
  verifySuccess,
  verifyFail,
  resendCodeSuccess,
  resendCodeFail,
} from "../actions/auth";

function* loginSaga({ payload }) {
  try {
    const { username, password } = payload;

    const res = yield call(login, {
      username,
      password,
    });

    const { status, data } = res;
    if (status === statusCode.SUCCESS) {
      localStorage.setItem("username", username);
      yield put(loginSuccess(data));
      yield put(push("/"));
    }
  } catch (err) {
    yield put(loginFail(err.response.data.message));
  }
}

function* checkAuthSaga() {
  yield checkAuth();
}

function* logoutSaga() {
  try {
    yield logout();
    yield localStorage.removeItem("accessToken");
    yield localStorage.removeItem("refreshToken");
    yield localStorage.removeItem("username");
    yield put(push("/login"));
  } catch (err) {
    console.log(err.response);
  }
}

function* registerSaga({ payload }) {
  try {
    const { email, fullname, username, password, date } = payload;

    const res = yield call(register, {
      email,
      fullname,
      username,
      password,
      date,
    });
    const { status, data } = res;
    if (status === statusCode.SUCCESS) {
      localStorage.setItem("register", email);
      yield put(registerSuccess(data));
      yield put(push("/verify"));
    }
    yield delay(1000);
  } catch (err) {
    yield put(registerFail(err.response.data.message));
  }
}

function* verifySaga({ payload }) {
  try {
    const { code } = payload;
    const email = localStorage.getItem("register");
    const res = yield call(verify, {
      code,
      email,
    });
    const { status, data } = res;
    if (status === statusCode.SUCCESS) {
      yield put(verifySuccess(data));
      yield put(push("/"));
    }
  } catch (err) {
    yield put(verifyFail(err.response.data.message));
  }
}

function* resendCodeSaga() {
  try {
    const email = localStorage.getItem("register");
    const res = yield call(resendCode, {
      email,
    });
    const { status, data } = res;
    if (status === statusCode.SUCCESS) {
      yield put(resendCodeSuccess(data));
    }
    yield delay(1000);
  } catch (err) {
    yield put(resendCodeFail(err.response.data.message));
  }
}

function* sagas() {
  yield takeEvery(authConstants.LOGIN, loginSaga);
  yield takeEvery(authConstants.CHECK_AUTH, checkAuthSaga);
  yield takeEvery(authConstants.LOGOUT, logoutSaga);
  yield takeEvery(authConstants.REGISTER, registerSaga);
  yield takeEvery(authConstants.VERIFY, verifySaga);
  yield takeEvery(authConstants.RESEND_CODE, resendCodeSaga);
}

export default sagas;
