import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import PostService from "@/services/PostService";

@Module({ namespaced: true })
export default class Post extends VuexModule {
  // state
  public postsData: Array<object> = [];

  // getters
  get posts() {
    return this.postsData;
  }

  @Action({ rawError: true })
  async getPosts(page: number): Promise<void | any> {
    const response = await PostService.getPost(page);
    const data: Array<object> = response.data.posts;

    return this.context.commit("setPosts", data);
  }

  @Action({ rawError: true })
  async addPost(post: object): Promise<void | any> {
    const response: any = await PostService.addPost(post);
    const data: object = response.data;

    return this.context.commit("newPost", data);
  }

  @Action({ rawError: true })
  async deletePost(id: number): Promise<void | any> {
    await PostService.deletePost(id);

    return this.context.commit("removePost", id);
  }

  @Mutation
  setPosts(posts: Array<object>) {
    this.postsData = this.postsData.concat(posts);
  }

  @Mutation
  newPost(post: object) {
    this.postsData.unshift(post);
  }

  @Mutation
  removePost(id: number) {
    this.postsData = this.postsData.filter(post => post.id !== id);
  }

  @Mutation
  newComment(post: object) {
    for (let i = 0; i < this.postsData.length; i++) {
      if (this.postsData[i].id === post.postId) {
        const comments = this.postsData[i].comments;
        return comments.unshift(post);
      }
    }
  }
}
