import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import auth from "./auth";
import ui from "./ui";
import switchRoute from "./switchRoute";

const rootReducers = (history) =>
  combineReducers({
    auth,
    ui,
    route: switchRoute,
    router: connectRouter(history),
  });

export default rootReducers;
