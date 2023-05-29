import axios from "axios";
import qs from "querystring";
import localforage from "localforage";
import { useNavigate } from "react-router-dom";

export function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT || "/",
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
        //401
        navigate("/401");
      } else if (error.response.status == 403) {
        //403
        navigate("/403");
      }
      return Promise.reject(error);
    }
  }
);

export default instance;
