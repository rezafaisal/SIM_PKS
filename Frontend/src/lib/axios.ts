import Axios, { AxiosRequestConfig } from "axios";
import storage from "utils/storage";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers!.authorization = `Bearer ${token}`;
  }
  config.headers!.Accept = "application/json";

  config.headers = config.headers || {};

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  return config;
}

export const axios = Axios.create({
  baseURL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      storage.clearToken();

      // New ^

      // prevRequest.sent = true
      // const newAccessToken = await refresh()
      // prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
      // return axios(prevRequest)
    }

    return Promise.reject(error);
  }
);
