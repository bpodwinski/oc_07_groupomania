import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import CommentService from "../../services/CommentService";
import PostService from "../../services/PostService";

@Module({ namespaced: true })
export default class Comment extends VuexModule {
  public comments: Array<object> = [];

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

    return this.context.commit("newComment", data);
  }

  @Mutation
  setComments(data: object) {
    this.comments = this.comments.concat(data);
  }

  @Mutation
  newComment(data: object) {
    console.log(data);

    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].postID === data.postId) {
        const comments = this.comments[i].comments;
        return comments.unshift(data);
      }
    }
  }
}
