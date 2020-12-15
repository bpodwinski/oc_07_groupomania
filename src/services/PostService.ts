import Api from "@/services";
import store from "@/store";

Api.interceptors.request.use(req => {
  req.headers.authorization = "Bearer " + store.getters.user.token;
  return req;
});

export default {
  getPost(page: number) {
    return Api.get("/post/" + page);
  },
  getPostComment(id: number) {
    return Api.get("/post/" + id + "/comment");
  },
  getUserPost(id: number) {
    return Api.get("/post/user/" + id);
  },
  addPost(data: object) {
    return Api.post("/post", data);
  },
  deletePost(id: number) {
    return Api.delete("/post/" + id);
  },
};
