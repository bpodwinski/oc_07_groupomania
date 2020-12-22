<template>
  <v-form>
    <v-text-field
      v-model="commentcontent"
      append-icon="mdi-send"
      filled
      type="text"
      :label="$t('comment.create')"
      @click:append="submitComment(postId, commentcontent)"
    ></v-text-field>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace, State } from "vuex-class";

const comment = namespace("comment");
const login = namespace("login");

@Component
export default class AddComment extends Vue {
  private commentcontent = "";
  @State(state => state.login.userId) userId: number;
  @Prop(Number) readonly postId: number;

  @comment.Action
  private addComment!: (comment: object) => Promise<void | any>;

  public submitComment(postId: number, commentcontent: string): void {
    const comment = {
      userId: this.userId,
      postId: postId,
      content: commentcontent,
    };
    this.addComment(comment);
  }
}
</script>

<style lang="scss"></style>
