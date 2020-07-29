import authSaga from "./auth";
import postSaga from "./post";
import userSaga from "./user";
import commentSaga from "./comment";

function* rootSagas() {
  yield* authSaga();
  yield* postSaga();
  yield* userSaga();
  yield* commentSaga();
}

export default rootSagas;
