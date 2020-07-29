import { toast } from "react-toastify";

import * as constants from "../constants/user";

const initialState = {
  profile: {},
  users: [],
  followers: [],
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
        profile: data,
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
        profile: data,
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
        users: data,
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

    case constants.GET_FOLLOWER: {
      return state;
    }

    case constants.GET_FOLLOWER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        followers: data,
      };
    }

    case constants.GET_FOLLOWER_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
