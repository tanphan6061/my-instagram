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
