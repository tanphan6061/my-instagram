import axiosServices from "../commons/axiosService";

const ENDPOINT = "/posts";

export const createPost = (data) => {
  return axiosServices.post(`${ENDPOINT}/create`, data);
};

export const fetchListPostsFollowing = () => {
  return axiosServices.get(`${ENDPOINT}/get-posts-following`);
};

export const getDetailPost = (data) => {
  return axiosServices.post(`${ENDPOINT}/get`, data);
};

export const likePost = (data) => {
  return axiosServices.post(`${ENDPOINT}/like`, data);
};
