import Api from "./index";

export default {
  Register(credentials: any) {
    return Api.post("/auth/register", credentials);
  },
  Login(credentials: any) {
    return Api.post("/auth/login", credentials);
  },
  Logout() {
    return Api.post("/auth/logout");
  },
};
