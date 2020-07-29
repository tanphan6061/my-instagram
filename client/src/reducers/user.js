import { toast } from "react-toastify";

import * as constants from "../constants/user";

const initialState = {
  mainProfile: {},
  userProfile: {},
  search: [],
  followings: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_PROFILE: {
      return state;
    }

    case constants.GET_PROFILE_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        mainProfile: data,
      };
    }

    case constants.GET_PROFILE_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    case constants.GET_PROFILE_USER: {
      return state;
    }

    case constants.GET_PROFILE_USER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        userProfile: data,
      };
    }

    case constants.GET_PROFILE_USER_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    case constants.SEARCH: {
      return state;
    }

    case constants.SEARCH_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        search: data,
      };
    }

    case constants.FOLLOW: {
      return state;
    }

    case constants.FOLLOW_SUCCESS: {
      const { data } = action.payload;
      toast.success(data);
      return state;
    }

    case constants.FOLLOW_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    case constants.GET_FOLLOWING: {
      return state;
    }

    case constants.GET_FOLLOWING_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        followings: data,
      };
    }

    case constants.GET_FOLLOWING_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
