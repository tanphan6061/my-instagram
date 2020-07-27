import * as constants from "../constants/swtichRoute";

const initialState = {
  name: "home",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SWITCH_ROUTE: {
      const { name } = action.payload;
      return {
        ...state,
        name,
      };
    }

    default:
      return state;
  }
};

export default reducer;
