import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

import AuthService from "../services/AuthService";
import PostService from "../services/PostService";

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    error: (state) => state.error,
    user: (state) => state.user,
    allPosts: (state) => state.posts,
  },
  actions: {
    async Register({ commit }, credentials: any) {
      await AuthService.Register(credentials);
      commit("setError", credentials);
    },
    async Login({ commit }, credentials: any) {
      try {
        const res: any = await AuthService.Login(credentials);
        commit("setUser", res.data);
        commit("setError");
        router.push({ name: "Home" });
      } catch (e) {
        commit("setError", e.res.data.error);
      }
    },
    async Logout({ commit }) {
      await AuthService.Logout();
      commit("setUser", null);
      router.push({ name: "Login" });
    },
    async fetchPosts({ commit }) {
      const res: any = await PostService.getPost();
      commit("setPosts", res.data);
    },
    async addPost({ commit }, post: object) {
      const res: any = await PostService.addPost(post);
      commit("newPost", res.data);
    },
    async deletePost({ commit }, id: number) {
      await PostService.deletePost(id);
      commit("removePost", id);
    },
  },
  mutations: {
    setError: (state, error): any => (state.error = error),
    setUser: (state, user: object) => (state.user = user),
    setPosts: (state, posts: any) => (state.posts = posts),
    newPost: (state, post: object) => state.posts.push(post),
    removePost: (state, id: number) =>
      (state.posts = state.posts.filter((post) => post.id !== id)),
  },
  state: {
    user: {},
    posts: [],
    error: "",
  },
  modules: {},
});
