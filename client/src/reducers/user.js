import { toast } from "react-toastify";

import * as constants from "../constants/user";

const initialState = {
  mainProfile: {},
  followings: [],
  userProfile: {},
  userFollower: [],
  userFollowing: [],
  search: [],
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

    case constants.GET_FOLLOWING_USER: {
      return state;
    }

    case constants.GET_FOLLOWING_USER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        userFollowing: data,
      };
    }

    case constants.GET_FOLLOWING_USER_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    case constants.GET_FOLLOWER_USER: {
      return state;
    }

    case constants.GET_FOLLOWER_USER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        userFollower: data,
      };
    }

    case constants.GET_FOLLOWER_USER_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    case constants.ADD_AVATAR: {
      return state;
    }

    case constants.ADD_AVATAR_SUCCESS: {
      toast.success("Add new avatar success");
      return state;
    }

    case constants.ADD_AVATAR_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    case constants.UPDATE_PROFILE: {
      return state;
    }

    case constants.UPDATE_PROFILE_SUCCESS: {
      toast.success("Update profile success");
      return state;
    }

    case constants.UPDATE_PROFILE_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    case constants.CHANGE_PASSWORD: {
      return state;
    }

    case constants.CHANGE_PASSWORD_SUCCESS: {
      toast.success("Change password success");
      return state;
    }

    case constants.CHANGE_PASSWORD_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
