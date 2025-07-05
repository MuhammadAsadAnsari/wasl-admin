import axios from "axios";
import { baseURL } from '../baseUrl'
import { memoizedRefreshToken } from "../axios/AxiosrRefreshToken";

axios.defaults.baseURL = `${baseURL}`;

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("wasl_token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    // Add the 'access-control-allow-origin' header to allow all origins
    config.headers['access-control-allow-origin'] = '*';

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;