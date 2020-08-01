import * as constants from "../constants/user";

export const getProfile = () => {
  return {
    type: constants.GET_PROFILE,
  };
};

export const getProfileSuccess = (data) => {
  return {
    type: constants.GET_PROFILE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getProfileFail = (error) => {
  return {
    type: constants.GET_PROFILE_FAIL,
    payload: {
      error,
    },
  };
};

export const getProfileUser = (username) => {
  return {
    type: constants.GET_PROFILE_USER,
    payload: {
      username,
    },
  };
};

export const getProfileUserSuccess = (data) => {
  return {
    type: constants.GET_PROFILE_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getProfileUserFail = (error) => {
  return {
    type: constants.GET_PROFILE_USER_FAIL,
    payload: {
      error,
    },
  };
};

export const search = (q) => {
  return {
    type: constants.SEARCH,
    payload: {
      q,
    },
  };
};

export const searchSuccess = (data) => {
  return {
    type: constants.SEARCH_SUCCESS,
    payload: {
      data,
    },
  };
};

export const follow = (id) => {
  return {
    type: constants.FOLLOW,
    payload: {
      id,
    },
  };
};

export const followSuccess = (data) => {
  return {
    type: constants.FOLLOW_SUCCESS,
    payload: {
      data,
    },
  };
};

export const followFail = (error) => {
  return {
    type: constants.FOLLOW_FAIL,
    payload: {
      error,
    },
  };
};

export const getFollowing = (id) => {
  return {
    type: constants.GET_FOLLOWING,
    payload: {
      id,
    },
  };
};

export const getFollowingSuccess = (data) => {
  return {
    type: constants.GET_FOLLOWING_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getFollowingFail = (error) => {
  return {
    type: constants.GET_FOLLOWING_FAIL,
    payload: {
      error,
    },
  };
};

export const getFollowingUser = (id) => {
  return {
    type: constants.GET_FOLLOWING_USER,
    payload: {
      id,
    },
  };
};

export const getFollowingUserSuccess = (data) => {
  return {
    type: constants.GET_FOLLOWING_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getFollowingUserFail = (error) => {
  return {
    type: constants.GET_FOLLOWING_USER_FAIL,
    payload: {
      error,
    },
  };
};

export const getFollowerUser = (id) => {
  return {
    type: constants.GET_FOLLOWER_USER,
    payload: {
      id,
    },
  };
};

export const getFollowerUserSuccess = (data) => {
  return {
    type: constants.GET_FOLLOWER_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getFollowerUserFail = (error) => {
  return {
    type: constants.GET_FOLLOWER_USER_FAIL,
    payload: {
      error,
    },
  };
};

export const addAvatar = (data) => {
  return {
    type: constants.ADD_AVATAR,
    payload: {
      data,
    },
  };
};

export const addAvatarSuccess = () => {
  return {
    type: constants.ADD_AVATAR_SUCCESS,
  };
};

export const addAvatarFail = (error) => {
  return {
    type: constants.ADD_AVATAR_FAIL,
    payload: {
      error,
    },
  };
};

export const updateProfile = (username, fullname, email, date, gender) => {
  return {
    type: constants.UPDATE_PROFILE,
    payload: {
      username,
      fullname,
      email,
      date,
      gender,
    },
  };
};

export const updateProfileSuccess = () => {
  return {
    type: constants.UPDATE_PROFILE_SUCCESS,
  };
};

export const updateProfileFail = (error) => {
  return {
    type: constants.UPDATE_PROFILE_FAIL,
    payload: {
      error,
    },
  };
};

export const changePassword = (password, newPassword) => {
  return {
    type: constants.CHANGE_PASSWORD,
    payload: {
      password,
      newPassword,
    },
  };
};

export const changePasswordSuccess = () => {
  return {
    type: constants.CHANGE_PASSWORD_SUCCESS,
  };
};

export const changePasswordFail = (error) => {
  return {
    type: constants.CHANGE_PASSWORD_FAIL,
    payload: {
      error,
    },
  };
};
