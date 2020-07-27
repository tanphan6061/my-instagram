import React from "react";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { configStore, history } from "./redux/configStore";
import { HOME_ROUTES, AUTH_ROUTES } from "./constants/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { checkAuth } from "./actions/auth";
import PrivateRoute from "./components/PrivateRoute";

const showPrivateRoute = (routes) => {
  let result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <PrivateRoute
          key={index}
          path={route.path}
          name={route.name}
          exact={route.exact}
          component={route.component}
        />
      );
    });
  }
  return result;
};

const showPublicRoute = (routes) => {
  let result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          name={route.name}
          exact={route.exact}
          component={route.component}
        />
      );
    });
  }
  return result;
};

function App() {
  const store = configStore();
  store.dispatch(checkAuth());
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Header />
        <main>
          <Switch>
            {showPublicRoute(AUTH_ROUTES)}
            {showPrivateRoute(HOME_ROUTES)}
          </Switch>
        </main>
        <Footer />
        <Loading />
      </ConnectedRouter>
      <ToastContainer />
    </Provider>
  );
}

export default App;
