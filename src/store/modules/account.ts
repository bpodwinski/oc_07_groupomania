import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import md5 from "md5";
import UserService from "../../services/UserService";

@Module({ namespaced: true })
export default class Account extends VuexModule {
  public data: object = {};

  @Action({ rawError: true })
  async getUser(id: number): Promise<void | any> {
    const response = await UserService.getUser(id);

    const data = Object.assign(response.data, {
      gravatar:
        "https://www.gravatar.com/avatar/" +
        md5(response.data.email.trim().toLowerCase()),
    });

    return this.context.commit("getUserSuccess", data);
  }

  @Mutation
  getUserSuccess(data: object) {
    this.data = data;
  }
}
