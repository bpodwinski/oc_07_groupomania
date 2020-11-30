import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import PostService from "../../services/PostService";

@Module
export default class Post extends VuexModule {
  public posts: Array<object> = [];

  get allPosts() {
    return this.posts;
  }

  @Mutation
  setPosts(posts: Array<object>) {
    this.posts = posts;
  }

  @Action
  async fetchPosts(): Promise<void> {
    const res = await PostService.getPost();
    this.context.commit("setPosts", res.data);
  }
}
