import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
  crossdomain: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    if (config.url !== "/register") {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        config.headers.Authorization = "Bearer " + accessToken;
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.data.message === "Expired JWT Token") {
      const originalRequest = error.config;
      return api
        .post("/token/refresh", { refresh_token: localStorage.getItem('refreshToken') })
        .then(({ data }) => {
          if (data !== undefined) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refresh_token);
          }
          originalRequest.headers = { Authorization: `Bearer ${data.token}` };

          return api(originalRequest);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (error.response.data.message === "Invalid JWT Token") {
      console.log("error");
    } else {
      return Promise.reject(error);
    }
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, api };