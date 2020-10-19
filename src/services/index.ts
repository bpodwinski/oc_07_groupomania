import axios from "axios";

export default axios.create({
  baseURL: "http://crios:3000/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
