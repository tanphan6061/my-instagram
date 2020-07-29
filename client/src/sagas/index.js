import authSaga from "./auth";
import postSaga from "./post";
import userSaga from "./user";

function* rootSagas() {
  yield* authSaga();
  yield* postSaga();
  yield* userSaga();
}

export default rootSagas;
