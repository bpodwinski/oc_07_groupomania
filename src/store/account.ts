import UserService from "@/services/UserService";
import { Module } from "vuex";

import router from "../router/index";
import AuthService from "../services/AuthService";

const authModule: Module<any, any> = {
  state: {
    user: {},
  },

  getters: {
    user: (state: any) => state.user,
  },

  actions: {
    async Login({ commit }, credentials: any) {
      const res: any = await AuthService.Login(credentials);
      commit("loginRequest", res.data);
    },
    async resUserData({ commit }) {
      const res: any = await UserService.getUser(2);
      commit("getuserData", res.data);

      router.push({ name: "Home" });
    },
  },

  mutations: {
    loginRequest(state: any, user: object) {
      state.user = user;
    },
    getuserData(state: any, user: object) {
      state.user = { ...state.user, ...user };
    },
  },
};

export default authModule;
