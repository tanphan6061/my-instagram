import { toast } from "react-toastify";

import * as constants from "../constants/auth";

const initalState = {
  loading: false,
  auth: false,
  verify: "",
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case constants.CHECK_AUTH: {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken || refreshToken) return { ...state, auth: true };
      return {
        ...state,
        auth: false,
      };
    }

    case constants.LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case constants.LOGIN_SUCCESS: {
      const { data } = action.payload;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return {
        ...state,
        auth: true,
        loading: false,
      };
    }

    case constants.LOGIN_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.LOGOUT: {
      return {
        ...state,
        auth: false,
      };
    }

    case constants.REGISTER: {
      return {
        ...state,
        loading: true,
      };
    }

    case constants.REGISTER_SUCCESS: {
      const { data } = action.payload;
      localStorage.setItem("username", data.username);
      return {
        ...state,
        loading: false,
        verify: data.email,
      };
    }

    case constants.REGISTER_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.VERIFY: {
      return {
        ...state,
        loading: true,
      };
    }

    case constants.VERIFY_SUCCESS: {
      const { data } = action.payload;
      localStorage.clear();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return {
        ...state,
        auth: true,
        loading: false,
      };
    }

    case constants.VERIFY_FAILL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.RESEND_CODE: {
      return {
        ...state,
        loading: true,
      };
    }

    case constants.RESEND_CODE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case constants.RESEND_CODE_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.REFRESH_TOKEN: {
      return {
        ...state,
      };
    }

    case constants.REFRESH_TOKEN_SUCCESS: {
      const { data } = action.payload;
      localStorage.setItem("accessToken", data.accessToken);
      return {
        ...state,
      };
    }

    case constants.REFRESH_TOKEN_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default reducer;
