<template>
  <div class="mt-5 mb-15">
    <template v-if="!allPosts.length">
      <v-alert color="yellow darken-3" outlined prominent text type="info">
        {{ $t("post.empty") }}
      </v-alert>
    </template>

    <template v-else>
      <v-card
        v-for="(post, index) in allPosts"
        :key="index"
        class="mx-auto mb-5"
      >
        <v-app-bar flat>
          <v-toolbar-title class="title">
            Toto {{ $i18n.locale }}
          </v-toolbar-title>
          <v-spacer></v-spacer>

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

        <v-list-item three-line>
          <v-list-item-content>
            <h3 class="mb-5">{{ post.title }}</h3>

            <div class="mb-10">{{ post.text }}</div>
            <div class="overline text-end">
              <v-icon>mdi-calendar</v-icon>
              {{ post.createdAt | dateFromNow }}
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

import PostService from "../../services/PostService";
import UserService from "../../services/UserService";

export default Vue.extend({
  name: "PostList",

  data() {
    return {};
  },

  methods: {
    ...mapActions(["fetchPosts", "deletePost"]),
  },

  mounted() {
    this.fetchPosts();
  },

  computed: mapGetters(["allPosts"]),
});
</script>

<style lang="scss">
.overline {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0 15px 5px 0 !important;
}
</style>
