import * as constants from "../constants/auth";

export const showLoading = () => {
  return {
    type: constants.SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: constants.HIDE_LOADING,
  };
};

export const checkAuth = () => {
  return {
    type: constants.CHECK_AUTH,
  };
};

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

export const register = (email, fullname, username, password, date) => {
  return {
    type: constants.REGISTER,
    payload: {
      email,
      fullname,
      username,
      password,
      date,
    },
  };
};

export const registerSuccess = (data) => {
  return {
    type: constants.REGISTER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const registerFail = (error) => {
  return {
    type: constants.REGISTER_FAIL,
    payload: {
      error,
    },
  };
};

export const verify = (code) => {
  return {
    type: constants.VERIFY,
    payload: {
      code,
    },
  };
};

export const verifySuccess = (data) => {
  return {
    type: constants.VERIFY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const verifyFail = (error) => {
  return {
    type: constants.VERIFY_FAILL,
    payload: {
      error,
    },
  };
};

export const resendCode = () => {
  return {
    type: constants.RESEND_CODE,
  };
};

export const resendCodeSuccess = (data) => {
  return {
    type: constants.RESEND_CODE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const resendCodeFail = (error) => {
  return {
    type: constants.RESEND_CODE_FAIL,
    payload: {
      error,
    },
  };
};
