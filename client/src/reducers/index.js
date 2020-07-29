import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import auth from "./auth";
import ui from "./ui";
import switchRoute from "./switchRoute";
import posts from "./post";
import user from "./user";

const rootReducers = (history) =>
  combineReducers({
    auth,
    ui,
    posts,
    user,
    route: switchRoute,
    router: connectRouter(history),
  });

export default rootReducers;
