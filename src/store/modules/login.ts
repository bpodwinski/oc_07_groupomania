import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import router from "@/router/index";
import AuthService from "@/services/AuthService";

@Module
export default class Login extends VuexModule {
  // state
  public logged = false;
  public alert = false;
  public credentials: object = {};
  public loginError: object = {};

  // getters
  get user() {
    return this.credentials;
  }

  @Action
  async Login(credentials: object): Promise<void | any> {
    const response = await AuthService.Login(credentials);

    if (response.data.error === 0) {
      const credentials: object = {
        token: response.data.token,
        userId: response.data.userId,
      };
      this.context.commit("loginSuccess", credentials);
      await new Promise(sleep => setTimeout(sleep, 1000));

      return router.push({ name: "Home" });
    } else {
      return this.context.commit("loginStop", response.data);
    }
  }

  @Mutation
  loginSuccess(credentials: object) {
    this.logged = true;
    this.credentials = credentials;
  }

  @Mutation
  loginStop(data: object) {
    this.loginError = data;
    this.alert = true;
  }
}
