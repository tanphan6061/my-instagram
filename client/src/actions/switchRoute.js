import * as constants from "../constants/swtichRoute";

export const switchRoute = (name) => {
  return {
    type: constants.SWITCH_ROUTE,
    payload: {
      name,
    },
  };
};
