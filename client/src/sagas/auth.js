import { call, put, delay, takeEvery } from "redux-saga/effects";

import { login } from "../apis/auth";
import * as constants from "../constants/auth";
import { showLoading, hideLoading } from "../actions/ui";

function* loginSaga({ payload }) {
  const { username, password } = payload;
  yield put(showLoading());
  const res = yield call(login, {
    username,
    password,
  });
  console.log(res);
  yield delay(1000);
  yield put(hideLoading());
}

function* sagas() {
  yield takeEvery(constants.LOGIN, loginSaga);
}

export default sagas;
