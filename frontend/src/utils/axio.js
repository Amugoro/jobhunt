import axios from "axios";
import { refreshAccessToken } from "./api";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}, Promise.reject);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config); // Retry original request
      }
    }
    return Promise.reject(error);
  }
);

export default API;
