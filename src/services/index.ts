import axios from "axios";
import router from "../router";

// Call axios instance into variable
const Api = axios.create({
  withCredentials: true,
  baseURL: "http://crios.local:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Error handling
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

// Add a response interceptor
Api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          console.log(error.response.data.message);
          router.push("Login");
          break;
        case 401:
          console.log(error.response.data.message);
          router.push("Login");
          break;
        case 403:
          console.log(error.response.data.message);
          router.push("Login");
          break;
        case 404:
          console.log(error.response.data.message);
          router.push("Login");
          break;
        case 500:
          console.log(error.response.data.message);
          router.push("Login");
      }
    }
  }
);

export default Api;
