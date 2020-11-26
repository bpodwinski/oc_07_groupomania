import Vue from "vue";
import Vuex from "vuex";

// import modules
import auth from "./auth";
import post from "./post";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    post,
  },

  getters: {
    error: state => state.error,
  },

  mutations: {
    setError: (state, error): any => (state.error = error),
  },

  state: {
    error: "",
  },
});
