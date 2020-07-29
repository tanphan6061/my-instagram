import { toast } from "react-toastify";

import * as constants from "../constants/post";

const initialState = {
  postFollowings: [],
  detailPost: {},
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_POSTS_FOLLOWING: {
      return {
        ...state,
        loading: true,
      };
    }

    case constants.FETCH_POSTS_FOLLOWING_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        postFollowings: data,
        loading: false,
      };
    }

    case constants.FETCH_POSTS_FOLLOWING_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.LIKE_POST: {
      return state;
    }

    case constants.LIKE_POST_SUCCESS: {
      return state;
    }

    case constants.LIKE_POST_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return state;
    }

    case constants.GET_DETAIL_POST: {
      return {
        ...state,
        loading: true,
      };
    }

    case constants.GET_DETAIL_POST_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        loading: false,
        detailPost: data,
      };
    }

    case constants.GET_DETAIL_POST_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.CREATE_POST: {
      return {
        ...state,
        loading: true,
      };
    }

    case constants.CREATE_POST_SUCCESS: {
      toast.success("Created post success");
      return {
        ...state,
        loading: false,
      };
    }

    case constants.CREATE_POST_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
