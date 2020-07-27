import * as constants from "../constants/ui";

const initialState = {
  dropdownHeart: false,
  dropdownProfile: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.TOGGLE_DROPDOWN_HEART: {
      return {
        ...state,
        dropdownHeart: !state.dropdownHeart,
      };
    }
    case constants.TOGGLE_DROPDOWN_PROFILE: {
      return {
        ...state,
        dropdownProfile: !state.dropdownProfile,
      };
    }
    default:
      return state;
  }
};

export default reducer;
