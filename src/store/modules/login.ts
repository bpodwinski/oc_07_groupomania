import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import router from "../../router";
import AuthService from "../../services/AuthService";

interface CredentialsEntity {
  token: string;
  userId: number | undefined;
}

@Module({ namespaced: true })
export default class Login extends VuexModule {
  // state
  public token: CredentialsEntity["token"] =
    sessionStorage.getItem("token") || "";
  public userId: CredentialsEntity["userId"];
  public loginError: object = {};
  public logged = false;
  public alert = false;

  @Action({ rawError: true })
  async Login(credentials: object): Promise<void | any> {
    const response = await AuthService.Login(credentials);

    if (response.data.error === 0) {
      const token = response.data.token;
      const userId = response.data.userId;

      sessionStorage.setItem("token", token);

      this.context.commit("loginSuccess", { userId, token });
      await new Promise(sleep => setTimeout(sleep, 1000));

      return router.push({ name: "Home" });
    } else {
      return this.context.commit("loginStop", response.data);
    }
  }

  @Action({ rawError: true })
  async authUser(data: object): Promise<void | any> {
    const token = data.token;
    const userId = data.decodedToken.userId;

    return this.context.commit("loginSuccess", { userId, token });
  }

  @Action({ rawError: true })
  async Logout(): Promise<void | any> {
    sessionStorage.removeItem("token");

    return this.context.commit("logoutSuccess");
  }

  @Mutation
  loginSuccess({ userId, token }: CredentialsEntity) {
    this.token = token;
    this.userId = userId;
    this.logged = true;
  }

  @Mutation
  loginStop(data: object) {
    this.loginError = data;
    this.alert = true;
  }

  @Mutation
  logoutSuccess() {
    this.token = "";
    this.userId = undefined;
    this.logged = false;
  }
}
