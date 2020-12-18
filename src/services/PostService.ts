import Api from "./index";

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
