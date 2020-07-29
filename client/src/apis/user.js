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

export const getFollowerApi = (data) => {
  return axiosServices.post(`${ENDPOINT}/get-users-follower`, data);
};
