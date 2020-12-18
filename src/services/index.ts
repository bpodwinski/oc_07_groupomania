import axios from "axios";
import router from "../router";
import store from "../store";

// Call axios instance into variable
const Api = axios.create({
  withCredentials: true,
  baseURL: "http://crios.local:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Put token to Axios requests
Api.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.authorization = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Error handling
Api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          console.log(error.response.data.message);
          store.dispatch("login/Logout");
          break;
        case 401:
          console.log(error.response.data.message);
          store.dispatch("login/Logout");
          break;
        case 403:
          console.log(error.response.data.message);
          store.dispatch("login/Logout");
          break;
        case 404:
          console.log(error.response.data.message);
          store.dispatch("login/Logout");
          break;
        case 500:
          console.log(error.response.data.message);
          store.dispatch("login/Logout");
      }
    }
  }
);

export default Api;
