import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { HOME_ROUTES, AUTH_ROUTES } from "../../constants/routes";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PrivateRoute from "../../components/PrivateRoute";
import * as postAction from "../../actions/post";
import * as userAction from "../../actions/user";

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
  const { auth, postActionCreators, userActionCreators } = props;
  const { fetchPostsFollowing } = postActionCreators;
  const { getProfile } = userActionCreators;

  useEffect(() => {
    fetchPostsFollowing();
    getProfile();
    // eslint-disable-next-line
  }, []);

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
    </>
  );
}

Layout.propTypes = {
  auth: PropTypes.bool,
  userActionCreators: PropTypes.shape({
    getProfile: PropTypes.func,
  }),
  postActionCreators: PropTypes.shape({
    fetchPostsFollowing: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActionCreators: bindActionCreators(userAction, dispatch),
    postActionCreators: bindActionCreators(postAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
