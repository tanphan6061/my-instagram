import axiosServices from "../commons/axiosService";

const ENDPOINT = "/users";

export const getProfile = () => {
  return axiosServices.get(`${ENDPOINT}/get-user-data`);
};

export const getProfileUser = (data) => {
  return axiosServices.post(`${ENDPOINT}/get-by-username`, data);
};

export const search = (data) => {
  return axiosServices.post(`${ENDPOINT}/search-by-username`, data);
};

export const follow = (data) => {
  return axiosServices.post(`${ENDPOINT}/followers`, data);
};

export const getFollowingApi = (data) => {
  return axiosServices.post(`${ENDPOINT}/get-users-following`, data);
};

export const getFollowerApi = (data) => {
  return axiosServices.post(`${ENDPOINT}/get-users-follower`, data);
};

export const addAvatar = (data) => {
  return axiosServices.post(`${ENDPOINT}/add-avatar`, data);
};

export const updateProfile = (data) => {
  return axiosServices.post(`${ENDPOINT}/update-profile`, data);
};

export const changePassword = (data) => {
  return axiosServices.post(`${ENDPOINT}/change-password`, data);
};
