import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import AuthService from "@/services/AuthService";

@Module
export default class Register extends VuexModule {
  // state
  public success = false;

  @Action
  async Register(data: object) {
    const response = await AuthService.Register(data);

    if (response.status === 201) {
      return this.context.commit("registerSuccess", true);
    }
  }

  @Mutation
  registerSuccess(success: boolean) {
    this.success = success;
  }
}
