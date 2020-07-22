import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import configStore from "./redux/configStore";
import { HOME_ROUTES } from "./constants/routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

const showRoutes = (routes) => {
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
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main>
          <Switch>{showRoutes(HOME_ROUTES)}</Switch>
        </main>
        <Footer />
        <Loading />
      </Router>
    </Provider>
  );
}

export default App;
