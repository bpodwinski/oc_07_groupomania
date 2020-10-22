import Api from "@/services";
import store from "@/store";

Api.interceptors.request.use((req) => {
  req.headers.authorization = "Bearer " + store.getters.user.token;
  return req;
});

export default {
  getPost(): any {
    return Api.get("/post");
  },
  addPost(data: object) {
    return Api.post("/post", data);
  },
  deletePost(id: number) {
    return Api.delete("/post/" + id);
  },
};
