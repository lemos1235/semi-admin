import axios from "axios";
import localforage from "localforage";
import qs from "querystring";
import { useNavigate } from "react-router-dom";

export function createInstance() {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_API || "/",
    paramsSerializer: function (params) {
      return qs.stringify(params);
    },
    withCredentials: false,
  });
}

const instance = createInstance();

instance.interceptors.request.use(
  async config => {
    const token = await localforage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    if (response.data) {
      return response.data;
    } else {
      return response;
    }
  },
  error => {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
      console.error("unexpected err", error);
      // Message.error('服务繁忙');
      return Promise.reject(error);
    } else {
      const navigate = useNavigate();
      if (error.response.status === 401) {
        navigate("/login");
      } else if (error.response.status == 403) {
        navigate("/403");
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
