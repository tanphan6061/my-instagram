import * as constants from "../constants/ui";

export const showLoading = () => {
  return {
    type: constants.SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: constants.HIDE_LOADING,
  };
};

export const toggleDropdown = () => {
  return {
    type: constants.TOGGLE_DROPDOWN,
  };
};
