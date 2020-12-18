import Api from "./index";

export default {
  getIdComment(id: number): any {
    return Api.get("/comment/" + id);
  },
  getUserComment(id: number): any {
    return Api.get("/comment/user/" + id);
  },
  addComment(data: object) {
    return Api.post("/comment", data);
  },
  deleteComment(id: number) {
    return Api.delete("/comment/" + id);
  },
};
