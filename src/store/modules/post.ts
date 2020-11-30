import { Module } from "vuex";
import PostService from "../../services/PostService";

const postModule: Module<any, any> = {
  state: {
    posts: [],
  },

  getters: {
    allPosts: state => state.posts,
  },

  actions: {
    async fetchPosts({ commit }) {
      const res: any = await PostService.getPost();
      commit("setPosts", res.data);
    },
  },

  mutations: {
    setPosts: (state, posts: any) => (state.posts = posts),
  },
};

export default postModule;
