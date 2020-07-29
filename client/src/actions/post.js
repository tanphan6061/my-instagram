import * as constants from "../constants/post";

export const fetchPostsFollowing = () => {
  return {
    type: constants.FETCH_POSTS_FOLLOWING,
  };
};

export const fetchPostsFollowingSuccess = (data) => {
  return {
    type: constants.FETCH_POSTS_FOLLOWING_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchPostsFollowingFail = (error) => {
  return {
    type: constants.FETCH_POSTS_FOLLOWING_FAIL,
    payload: {
      error,
    },
  };
};

export const getDetailPost = (postId) => {
  return {
    type: constants.GET_DETAIL_POST,
    payload: {
      postId,
    },
  };
};

export const getDetailPostSuccess = (data) => {
  return {
    type: constants.GET_DETAIL_POST_SUCCESS,
    payload: {
      data,
    },
  };
};

export const getDetailPostFail = (error) => {
  return {
    type: constants.GET_DETAIL_POST_FAIL,
    payload: {
      error,
    },
  };
};

export const likePost = (postId, callback) => {
  return {
    type: constants.LIKE_POST,
    payload: {
      postId,
      callback,
    },
  };
};

export const likePostSuccess = (data) => {
  return {
    type: constants.LIKE_POST_SUCCESS,
    payload: {
      data,
    },
  };
};

export const likePostFail = (error) => {
  return {
    type: constants.LIKE_POST_FAIL,
    payload: {
      error,
    },
  };
};

export const createPost = (data) => {
  return {
    type: constants.CREATE_POST,
    payload: {
      data,
    },
  };
};

export const createPostSuccess = (data) => {
  return {
    type: constants.CREATE_POST_SUCCESS,
    payload: {
      data,
    },
  };
};

export const createPostFail = (error) => {
  return {
    type: constants.CREATE_POST_FAIL,
    payload: {
      error,
    },
  };
};
