import Api from "@/services";

export default {
  getUser(id: any) {
    return Api.get("/user/" + id);
  },
};
