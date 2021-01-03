import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import PostService from "../../services/PostService";

@Module({ namespaced: true })
export default class Post extends VuexModule {
  public posts: Array<object> = [];
  public page = 0;

  @Action({ rawError: true })
  async setPage(): Promise<void | any> {
    return this.context.commit("addPage");
  }

  @Action({ rawError: true })
  async getPosts(page: number): Promise<void | any> {
    const response = await PostService.getPost(page);
    const data: Array<object> = response.data.posts;

    this.context.commit("setPosts", data);
    return data;
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

  @Action({ rawError: true })
  async getComment(postId: number): Promise<void | any> {
    const response: any = await PostService.getPostComment(postId);
    const data: object = response.data;

    return this.context.commit("setComments", data);
  }

  @Mutation
  addPage() {
    this.page++;
  }

  @Mutation
  setPosts(posts: Array<object>) {
    return (this.posts = this.posts.concat(posts));
  }

  @Mutation
  newPost(post: object) {
    return this.posts.unshift(post);
  }

  @Mutation
  removePost(id: number) {
    return (this.posts = this.posts.filter(post => post.id !== id));
  }

  @Mutation
  setComments(data: object) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === data.postID) {
        const comments: object = {
          comments: data.comments,
        };
        return Object.assign(this.posts[i], comments);
      }
    }
  }
}
