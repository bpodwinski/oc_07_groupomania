import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "http://crios:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
