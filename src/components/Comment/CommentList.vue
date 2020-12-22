<template>
  <v-container>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header @click.once="showComment(postId)">
          {{ $t("comment.title") }}
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <AddComment :postId="postId" />
          <template v-for="comment in comments">
            <template v-if="comment.comments.length">
              <v-list :key="comment.postID" v-if="comment.postID === postId">
                <v-list-item
                  v-for="(comment, index) in comment.comments"
                  :key="index"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ comment.user.firstname }}
                      {{ comment.user.lastname }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ comment.createdAt | dateFromNow }}
                    </v-list-item-subtitle>
                    <v-list-item-content class="comment-content">{{
                      comment.content
                    }}</v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </template>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import AddComment from "./AddComment.vue";

const comment = namespace("comment");

@Component({
  components: {
    AddComment,
  },
})
export default class CommentList extends Vue {
  private commentcontent = "";
  @State(state => state.comment.comments) comments: [];
  @Prop(Number) readonly postId: number;

  @comment.Action
  private getComment!: (id: number) => Promise<void | any>;

  @comment.Action
  private addComment!: (comment: object) => Promise<void | any>;

  public showComment(postId: number) {
    this.getComment(postId);
  }

  public submitComment(postId: number, commentcontent: string): void {
    const comment = {
      userId: this.$store.state.login.userId,
      postId: postId,
      content: commentcontent,
    };
    this.addComment(comment);
  }
}
</script>

<style lang="scss">
.comment-content {
  background-color: rgba(128, 128, 128, 0.18);
  margin-top: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
}
</style>
