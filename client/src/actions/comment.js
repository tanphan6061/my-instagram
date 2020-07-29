import * as constants from "../constants/comment";

export const addComment = (postId, content, callback) => {
  return {
    type: constants.ADD_COMMENT,
    payload: {
      postId,
      content,
      callback,
    },
  };
};

export const addCommentSuccess = (data) => {
  return {
    type: constants.ADD_COMMENT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addCommentFail = (error) => {
  return {
    type: constants.ADD_COMMENT_FAIL,
    payload: {
      error,
    },
  };
};
