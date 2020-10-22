import Api from "@/services";
import store from "@/store";

Api.interceptors.request.use((req) => {
  req.headers.authorization = "Bearer " + store.getters.user.token;
  return req;
});

export default {
  getUser(id: any) {
    return Api.get("/user/" + id);
  },
};
