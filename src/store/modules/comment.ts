import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import CommentService from "../../services/CommentService";
import PostService from "../../services/PostService";

@Module({ namespaced: true })
export default class Comment extends VuexModule {
  // state
  public data: Array<object> = [];

  @Action({ rawError: true })
  async getComment(postId: number): Promise<void | any> {
    const response: any = await PostService.getPostComment(postId);
    const data: object = response.data;

    return this.context.commit("setComments", data);
  }

  @Action({ rawError: true })
  async addComment(comment: object): Promise<void | any> {
    const response: any = await CommentService.addComment(comment);
    const data: object = response.data;

    return this.context.commit("post/newComment", data, { root: true });
  }

  @Mutation
  setComments(data: object) {
    this.data = this.data.concat(data);
  }
}
