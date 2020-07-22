import * as constants from "../constants/auth";

export const login = (username, password) => {
  return {
    type: constants.LOGIN,
    payload: {
      username,
      password,
    },
  };
};

export const loginSuccess = (data) => {
  return {
    type: constants.LOGIN_SUCCESS,
    payload: {
      data,
    },
  };
};

export const loginFail = (error) => {
  return {
    type: constants.LOGIN_FAIL,
    payload: {
      error,
    },
  };
};

export const logout = () => {
  return {
    type: constants.LOGOUT,
  };
};
