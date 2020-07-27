import authSaga from "./auth";

function* rootSagas() {
  yield* authSaga();
}

export default rootSagas;
