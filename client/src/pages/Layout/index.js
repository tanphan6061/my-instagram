import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { HOME_ROUTES, AUTH_ROUTES } from "../../constants/routes";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import PrivateRoute from "../../components/PrivateRoute";

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

function Layout(props) {
  const { auth } = props;

  return (
    <>
      {auth && <Header />}
      <main>
        <Switch>
          {showPublicRoute(AUTH_ROUTES)}
          {showPrivateRoute(HOME_ROUTES)}
        </Switch>
      </main>
      <Footer />
      <Loading />
    </>
  );
}

Layout.propTypes = {
  auth: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
  };
};

export default connect(mapStateToProps, null)(Layout);
