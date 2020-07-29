import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

import { PageProfile, Content } from "./styles";
import { Posts, Igtv, Saved, Tagged } from "../../constants/svgs";
import { PROFILE_ROUTES } from "../../constants/routes";
import UserInfo from "../../components/UserInfo";
import ChildProfilePage from "../../components/ChildProfilePage";
import * as userAction from "../../actions/user";

const getSubRoutes = (username) => [
  { name: "POSTS", link: `/${username}/post`, icon: Posts },
  { name: "IGTV", link: `/${username}/channel`, icon: Igtv },
  {
    name: "SAVED",
    link: `/${username}/saved`,
    icon: Saved,
    style: { width: "20%" },
  },
  { name: "TAGGED", link: `/${username}/tagged`, icon: Tagged },
];

const showRoutes = (routes, posts) => {
  let result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          name={route.name}
          exact={route.exact}
          render={(props) => <ChildProfilePage posts={posts} {...props} />}
        />
      );
    });
  }
  return result;
};

function Profile(props) {
  const { match, profile, followers, userActionCreators } = props;
  const { username } = match.params;
  const { getProfileUser, follow } = userActionCreators;
  const currentLogin = localStorage.getItem("username");

  useEffect(() => {
    getProfileUser(username);
  }, [username]);

  return (
    <PageProfile>
      <UserInfo
        className="user-info"
        profile={profile}
        listFollowers={followers}
        isCurrentLogin={currentLogin === username}
        handleFollow={follow}
      />

      <div className="d-flex justify-content-center mt-2 route-profile">
        <ul>
          {getSubRoutes(username).map((item, index) => (
            <Link to={item.link} key={index} className="ml-5">
              <li className="d-flex align-items-center">
                <img
                  style={item.style && item.style}
                  src={item.icon}
                  className="mr-2"
                  alt={item.name}
                />
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <Content>{showRoutes(PROFILE_ROUTES, profile.posts)}</Content>
    </PageProfile>
  );
}

Profile.propTypes = {
  followers: PropTypes.array,
  match: PropTypes.object,
  profile: PropTypes.object,
  userActionCreators: PropTypes.shape({
    getProfileUser: PropTypes.func,
    follow: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    followers: state.user.followers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActionCreators: bindActionCreators(userAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
