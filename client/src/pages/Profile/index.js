import React from "react";
import { Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

import { PageProfile, Content } from "./styles";
import { Posts, Igtv, Saved, Tagged } from "../../constants/svgs";
import { PROFILE_ROUTES } from "../../constants/routes";

import UserInfo from "../../components/UserInfo";

const getSubRoutes = (username) => [
  { name: "POSTS", link: `/${username}`, icon: Posts },
  { name: "IGTV", link: `/${username}/channel`, icon: Igtv },
  {
    name: "SAVED",
    link: `/${username}/saved`,
    icon: Saved,
    style: { width: "20%" },
  },
  { name: "TAGGED", link: `/${username}/tagged`, icon: Tagged },
];

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

function Profile(props) {
  const { match } = props;
  const { username } = match.params;

  return (
    <PageProfile>
      <UserInfo className="user-info" />

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

      <Content>{showRoutes(PROFILE_ROUTES)}</Content>
    </PageProfile>
  );
}

Profile.propTypes = {
  match: PropTypes.object,
};

export default Profile;
