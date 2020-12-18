import Api from "./index";

export default {
  getUser(id: number) {
    return Api.get("/user/" + id);
  },
  updateUser(id: number, data: object) {
    return Api.post("/user/" + id, data);
  },
};
