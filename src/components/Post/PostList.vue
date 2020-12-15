<template>
  <div class="mt-5 mb-15">
    <template v-if="posts.length">
      <v-card
        v-for="(post, index) in posts"
        :key="index"
        class="mx-auto mb-10"
        elevation="3"
      >
        <!-- ******** TITLE POST START ******** -->
        <v-app-bar flat>
          <v-toolbar-title class="title">
            id: {{ post.id }} - {{ post.user.firstname }}
            {{ post.user.lastname }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <div class="overline text-end">
            <v-icon>mdi-calendar</v-icon>
            {{ post.createdAt | dateFromNow }}
          </div>

          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense nav>
              <v-list-item link @click="deletePost(post.id)">
                <v-list-item-icon>
                  <v-icon>mdi-delete</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ $t("delete") }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
        <!-- ******** TITLE POST END ******** -->

        <!-- ******** POST CONTENT START ******** -->
        <v-card-title> {{ post.title }} </v-card-title>

        <v-card-text>
          {{ post.content }}
        </v-card-text>
        <!-- ******** POST CONTENT END ******** -->

        <!-- ******** COMMENTS START ******** -->
        <v-card-actions>
          <v-container>
            <!-- add comment form -->
            <v-form>
              <v-text-field
                v-model="commentcontent"
                append-icon="mdi-send"
                filled
                type="text"
                :label="$t('comment.create')"
                @click:append="submitComment(post.id, commentcontent)"
              ></v-text-field>
            </v-form>

            <!-- comments list -->
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ $t("comment.title") }}</v-expansion-panel-header
                >
                <v-expansion-panel-content
                  v-for="(comment, index) in post.comments"
                  :key="index"
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          >{{ comment.user.firstname }}
                          {{ comment.user.lastname }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{
                          comment.createdAt | dateFromNow
                        }}</v-list-item-subtitle>
                        <v-list-item-content class="comment-content">{{
                          comment.content
                        }}</v-list-item-content>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-container>
        </v-card-actions>
        <!-- ******** COMMENTS END ******** -->
      </v-card>

      <!-- ******** LOADMORE TRANSITION START ******** -->
      <transition name="fade">
        <div v-show="loadmore" class="loadmore text-center">
          <v-progress-circular
            indeterminate
            :size="50"
            :width="8"
            color="primary"
          ></v-progress-circular>
        </div>
      </transition>
      <!-- ******** LOADMORE TRANSITION END ******** -->
    </template>
    <!-- ******** NO POSTS START ******** -->
    <template v-else>
      <v-alert color="yellow darken-3" outlined prominent text type="info">
        {{ $t("post.empty") }}
      </v-alert>
    </template>
    <!-- ******** NO POSTS END ******** -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const post = namespace("post");
const comment = namespace("comment");

@Component
export default class PostList extends Vue {
  private loadmore = false;
  private page = 1;
  private commentcontent = "";

  @post.Getter
  private posts!: [];

  @post.Action
  private getPosts!: (page: number) => Promise<void | any>;

  @post.Action
  private deletePost!: (id: number) => Promise<void | any>;

  @comment.Action
  private addComment!: (comment: object) => Promise<void | any>;

  public loadMore() {
    this.loadmore = true;

    setTimeout(e => {
      this.getPosts(this.page++);
      this.loadmore = false;
    }, 1000);
  }

  public submitComment(postId: number, commentcontent: string): void {
    const comment = {
      userId: this.$store.state.login.credentials.userId,
      postId: postId,
      content: commentcontent,
    };
    this.addComment(comment);
  }

  async mounted() {
    if (window.innerHeight == document.body.offsetHeight) {
      await this.getPosts(0);
    }

    await addEventListener("scroll", e => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        return this.loadMore();
      }
    });
  }
}
</script>

<style lang="scss">
.loadmore {
  position: fixed;
  z-index: 9;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 4rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.comment-content {
  background-color: rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
}
</style>
