import axiosServices from "../commons/axiosService";

const ENDPOINT = "/auth";

export const login = (data) => {
  return axiosServices.post(`${ENDPOINT}/login`, data);
};

export const logout = () => {
  return axiosServices.post(`${ENDPOINT}/logout`);
};
