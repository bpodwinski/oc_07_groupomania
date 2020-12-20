<template>
  <div class="mt-5 mb-15">
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
          {{ post.user.lastname }} userId :{{ post.user.id }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="overline text-end">
          <v-icon>mdi-calendar</v-icon>
          {{ post.createdAt | dateFromNow }}
        </div>

        <v-menu v-if="post.user.id === userId" bottom left>
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
              v-model="commentcontent[index]"
              append-icon="mdi-send"
              filled
              type="text"
              :label="$t('comment.create')"
              @click:append="submitComment(post.id, commentcontent[index])"
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
    <infinite-loading @infinite="infiniteHandler">
      <span slot="spinner">
        <v-progress-circular
          indeterminate
          :size="60"
          :width="6"
          color="primary"
        ></v-progress-circular>
      </span>

      <v-alert slot="no-more" text outlined prominent type="info">
        {{ $t("post.nomore") }}
      </v-alert>

      <v-alert slot="no-results" text outlined prominent type="warning">
        {{ $t("post.empty") }}
      </v-alert>
    </infinite-loading>
    <!-- ******** LOADMORE TRANSITION END ******** -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import InfiniteLoading from "vue-infinite-loading";
import vueDebounce, { PluginConfig, debounce } from "vue-debounce";

const post = namespace("post");
const login = namespace("login");
const comment = namespace("comment");

@Component({
  components: {
    InfiniteLoading,
  },
})
export default class PostList extends Vue {
  private loadmore = false;
  private page = 0;
  private commentcontent: any = {};
  @State(state => state.post.posts) posts: [];
  @State(state => state.login.userId) userId: number;

  @post.Action
  private getPosts!: (page: number) => Promise<void | any>;

  @post.Action
  private deletePost!: (id: number) => Promise<void | any>;

  @comment.Action
  private addComment!: (comment: object) => Promise<void | any>;

  public async infiniteHandler($state) {
    await new Promise(r => setTimeout(r, 500));
    this.getPosts(this.page).then(response => {
      if (response.length) {
        this.page++;
        $state.loaded();
      } else {
        $state.complete();
      }
    });
  }

  public submitComment(postId: number, commentcontent: string): void {
    const comment = {
      userId: this.$store.state.login.credentials.userId,
      postId: postId,
      content: commentcontent,
    };
    this.addComment(comment);
  }
}
</script>

<style lang="scss">
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
