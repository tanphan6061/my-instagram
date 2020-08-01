import React from "react";
import { Route, Link } from "react-router-dom";

import {
  PageSetting,
  Sidebar,
  ListRoute,
  RouteItem,
  Content,
  ContentList,
  Span,
} from "./styles";
import { SETTING_ROUTES } from "../../constants/routes";

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
          render={route.render}
        />
      );
    });
  }
  return result;
};

function Setting() {
  return (
    <PageSetting className="page-setting">
      <Sidebar>
        <ListRoute>
          <RouteItem>
            <Link to="/accounts/edit">
              <Span>Edit Profile</Span>
            </Link>
          </RouteItem>
          <RouteItem>
            <Link to="/accounts/password">
              <Span>Change Password</Span>
            </Link>
          </RouteItem>
          <RouteItem>
            <Link to="/accounts/web?name=active">
              <Span>Apps and Websites</Span>
            </Link>
          </RouteItem>
          <RouteItem>
            <Span>Email and SMS</Span>
          </RouteItem>
          <RouteItem>
            <Span>Push Notifications</Span>
          </RouteItem>
          <RouteItem>
            <Span>Manage Contacts</Span>
          </RouteItem>
          <RouteItem>
            <Span>Privacy and Security</Span>
          </RouteItem>
          <RouteItem>
            <Span>Login Activity</Span>
          </RouteItem>
          <RouteItem>
            <Span>Emails form Instagram</Span>
          </RouteItem>
        </ListRoute>
      </Sidebar>
      <Content>
        <ContentList>{showRoutes(SETTING_ROUTES)}</ContentList>
      </Content>
    </PageSetting>
  );
}

export default Setting;
