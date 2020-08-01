import React from "react";

import HomePage from "../pages/Home";
import DirectPage from "../pages/Direct";
import ExplorePage from "../pages/Explore";
import ProfilePage from "../pages/Profile";
import LoginPage from "../pages/Login";
import VerifyPage from "../pages/Verify";
import SignupPage from "../pages/Signup";
import DetailPostPage from "../pages/DetailPost";
import SettingPage from "../pages/Setting";
import EditComponent from "../components/EditSetting";
import PasswordComponent from "../components/PasswordSetting";
import AppWebsiteComponent from "../components/AppWebSetting";

export const AUTH_ROUTES = [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupPage,
  },
  {
    path: "/verify",
    name: "verify",
    component: VerifyPage,
  },
];

export const HOME_ROUTES = [
  {
    path: "/",
    name: "home",
    exact: true,
    component: HomePage,
  },
  {
    path: "/inbox",
    name: "inbox",
    exact: true,
    component: DirectPage,
  },
  {
    path: "/explore",
    name: "explore",
    exact: true,
    component: ExplorePage,
  },
  {
    path: "/p/:id",
    name: "detailPost",
    exact: false,
    component: DetailPostPage,
  },
  {
    path: "/accounts/:name",
    name: "setting",
    exact: false,
    component: SettingPage,
  },
  {
    path: "/:username",
    name: "profile",
    exact: false,
    component: ProfilePage,
  },
];

export const PROFILE_ROUTES = [
  {
    path: "/:username/post",
    name: "currentPost",
    exact: true,
  },
  {
    path: "/:username/channel",
    name: "channel",
    exact: true,
  },
  {
    path: "/:username/saved",
    name: "saved",
    exact: true,
  },
  {
    path: "/:username/tagged",
    name: "tagged",
    exact: true,
  },
];

export const SETTING_ROUTES = [
  {
    path: "/accounts/edit",
    name: "editAccount",
    exact: true,
    render: (props) => <EditComponent {...props} />,
  },
  {
    path: "/accounts/password",
    name: "changePassword",
    exact: true,
    render: (props) => <PasswordComponent {...props} />,
  },
  {
    path: "/accounts/manage_access",
    name: "manageAccess",
    exact: true,
  },
  {
    path: "/accounts/contact_history",
    name: "contactHistory",
    exact: true,
  },
  {
    path: "/accounts/privacy_and_security/",
    name: "privacy",
    exact: true,
  },
  {
    path: "/accounts/email",
    name: "emailSetting",
    exact: true,
  },
  {
    path: "/accounts/emails_sent/",
    name: "emailSent",
    exact: true,
  },
  {
    path: "/accounts/web",
    name: "webSetting",
    exact: true,
    render: AppWebsiteComponent,
  },
  {
    path: "/accounts/login_activity/",
    name: "loginActivity",
    exact: true,
  },
];
