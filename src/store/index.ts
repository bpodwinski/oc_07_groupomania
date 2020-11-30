import Vue from "vue";
import Vuex from "vuex";

// import modules
import Auth from "./modules/auth";
import Post from "./modules/post_type";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    post: Post,
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
