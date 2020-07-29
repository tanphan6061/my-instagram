import axiosServices from "../commons/axiosService";

const ENDPOINT = "/comments";

export const addComment = (data) => {
  return axiosServices.post(`${ENDPOINT}/add-comment`, data);
};
