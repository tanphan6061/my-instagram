import * as constants from "../constants/ui";

const initialState = {
  loading: false,
  dropdown: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SHOW_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case constants.HIDE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case constants.TOGGLE_DROPDOWN: {
      return {
        ...state,
        dropdown: !state.dropdown,
      };
    }
    default:
      return state;
  }
};

export default reducer;
