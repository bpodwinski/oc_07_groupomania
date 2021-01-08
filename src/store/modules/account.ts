import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import md5 from "md5";
import UserService from "../../services/UserService";

@Module({ namespaced: true })
export default class Account extends VuexModule {
  public data: object = {};

  @Action({ rawError: true })
  async getUser(id: number): Promise<void | any> {
    const response = await UserService.getUser(id);

    return this.context.commit("getUserSuccess", response.data);
  }

  @Action({ rawError: true })
  async updateUser(data: any): Promise<void | any> {
    await UserService.updateUser(data.id, {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      service: data.service,
    });

    return this.context.dispatch("getUser", data.id);
  }

  @Action({ rawError: true })
  async deleteUser(id: number): Promise<void | any> {
    await UserService.deleteUser(id);

    return this.context.dispatch("login/Logout", null, { root: true });
  }

  @Mutation
  getUserSuccess(data: object) {
    this.data = data;
  }
}
