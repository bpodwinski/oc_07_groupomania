import { Module } from "vuex";
import PostService from "../services/PostService";

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
    setPosts: (state, posts: any) => (state.posts = posts),
    newPost: (state, post: any) => state.posts.push(post),
    removePost: (state, id: number) =>
      (state.posts = state.posts.filter(post => post.id !== id)),
  },
};

export default postModule;
