import HomePage from "../pages/Home";
import DirectPage from "../pages/Direct";
import ExplorePage from "../pages/Explore";
import ProfilePage from "../pages/Profile";
import LoginPage from "../pages/Login";
import VerifyPage from "../pages/Verify";
import SignupPage from "../pages/Signup";
import DetailPostPage from "../pages/DetailPost";
// import ChildProfilePage from "../components/ChildProfilePage";

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
    exact: false,
    // component: ChildProfilePage,
  },
  {
    path: "/:username/channel",
    name: "channel",
    exact: false,
    // component: ChildProfilePage,
  },
  {
    path: "/:username/saved",
    name: "saved",
    exact: false,
    // component: ChildProfilePage,
  },
  {
    path: "/:username/tagged",
    name: "tagged",
    exact: false,
    // component: ChildProfilePage,
  },
];

export const SETTING_ROUTES = [
  {
    path: "/accounts/edit",
    name: "editProfile",
    exact: true,
    component: HomePage,
  },
  {
    path: "/password/change",
    name: "changePassword",
    exact: true,
    component: HomePage,
  },
  {
    path: "/accounts/manage_access",
    name: "manageAccess",
    exact: true,
    component: HomePage,
  },
  {
    path: "/accounts/contact_history",
    name: "contactHistory",
    exact: true,
    component: HomePage,
  },
  {
    path: "/accounts/privacy_and_security/",
    name: "privacy",
    exact: true,
    component: HomePage,
  },
  {
    path: "/emails/settings",
    name: "emailSetting",
    exact: true,
    component: HomePage,
  },
  {
    path: "/emails/emails_sent/",
    name: "emailSent",
    exact: true,
    component: HomePage,
  },
  {
    path: "/push/web/settings",
    name: "webSetting",
    exact: true,
    component: HomePage,
  },
  {
    path: "/session/login_activity/",
    name: "loginActivity",
    exact: true,
    component: HomePage,
  },
];
