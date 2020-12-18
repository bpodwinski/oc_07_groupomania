import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import UserService from "../../services/UserService";

@Module({ namespaced: true })
export default class Account extends VuexModule {
  // state
  public data: object = {};

  @Action({ rawError: true })
  async getUser(id: number): Promise<void | any> {
    const response = await UserService.getUser(id);

    return this.context.commit("getUserSuccess", response.data);
  }

  @Mutation
  getUserSuccess(data: object) {
    this.data = data;
  }
}
