<template>
  <div class="mt-5 mb-20">
    <v-card
      v-for="(post, index) in posts"
      :key="index"
      class="mx-auto mb-10"
      elevation="3"
    >
      <!-- ******** TITLE POST START ******** -->
      <v-app-bar flat>
        <v-toolbar-title class="title">
          {{ post.user.firstname }} {{ post.user.lastname }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="overline text-end">
          <v-icon>mdi-calendar</v-icon>
          {{ post.createdAt | dateFromNow }}
        </div>

        <v-menu
          v-if="post.user.id === userId || account.data.admin"
          bottom
          left
        >
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

      <v-card-actions>
        <CommentList :postId="post.id" />
      </v-card-actions>
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
import CommentList from "../Comment/CommentList.vue";

const post = namespace("post");
const login = namespace("login");
const account = namespace("account");
const comment = namespace("comment");

@Component({
  components: {
    InfiniteLoading,
    CommentList,
  },
})
export default class PostList extends Vue {
  private loadmore = false;
  @State account;
  @State(state => state.post.page) page: number;
  @State(state => state.post.posts) posts: [];
  @State(state => state.comment.data) comments: [];
  @State(state => state.login.userId) userId: number;

  @post.Action
  private setPage!: () => Promise<void | any>;

  @post.Action
  private getPosts!: (page: number) => Promise<void | any>;

  @post.Action
  private deletePost!: (id: number) => Promise<void | any>;

  public async infiniteHandler($state) {
    await new Promise(r => setTimeout(r, 500));
    this.getPosts(this.page).then(response => {
      if (response.length) {
        this.setPage();
        $state.loaded();
      } else {
        $state.complete();
      }
    });
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
</style>
