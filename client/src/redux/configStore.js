import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import rootReducers from "../reducers";
import rootSagas from "../sagas";

export const history = createBrowserHistory();

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

export const configStore = (preloadedState) => {
  const middleware = [sagaMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middleware)];
  const store = createStore(
    rootReducers(history),
    preloadedState,
    composeEnhancers(...enhancers),
  );
  sagaMiddleware.run(rootSagas);
  return store;
};
