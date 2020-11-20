import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "http://crios.local:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
