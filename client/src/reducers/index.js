import { combineReducers } from "redux";

import auth from "./auth";
import ui from "./ui";
import switchRoute from "./switchRoute";

const rootReducers = combineReducers({
  auth,
  ui,
  route: switchRoute,
});

export default rootReducers;
