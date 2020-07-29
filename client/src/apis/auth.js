import axiosServices from "../commons/axiosService";

const ENDPOINT = "/auth";

const token = localStorage.getItem("refreshToken");

export const login = (data) => {
  return axiosServices.post(`${ENDPOINT}/login`, data);
};

export const logout = () => {
  return axiosServices.post(`${ENDPOINT}/logout`, { token });
};

export const register = (data) => {
  return axiosServices.post(`${ENDPOINT}/register`, data);
};

export const verify = (data) => {
  return axiosServices.post(`${ENDPOINT}/verify`, data);
};

export const resendCode = (data) => {
  return axiosServices.post(`${ENDPOINT}/resend-code`, data);
};

export const refreshToken = (data) => {
  return axiosServices.post(`${ENDPOINT}/refresh-token`, data);
};
