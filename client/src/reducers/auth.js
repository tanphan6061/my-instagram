import * as constants from "../constants/auth";

const initalState = false;

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case constants.LOGIN: {
      return state;
    }

    case constants.LOGIN_SUCCESS: {
      return true;
    }

    case constants.LOGIN_FAIL: {
      return false;
    }

    case constants.LOGOUT: {
      return false;
    }

    default:
      return state;
  }
};

export default reducer;
