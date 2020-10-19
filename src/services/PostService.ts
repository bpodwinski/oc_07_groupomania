import Api from "@/services";

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
