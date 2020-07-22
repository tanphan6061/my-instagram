import * as constants from "../constants/swtichRoute";

const initialState = {
  name: "home",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SWITCH_ROUTE: {
      return {
        ...state,
        name: action.payload.name,
      };
    }

    default:
      return state;
  }
};

export default reducer;
