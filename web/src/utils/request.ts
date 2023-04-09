import axios from "axios";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (localStorage.getItem("token")) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default request;
