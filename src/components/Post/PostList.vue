<template>
  <v-col cols="12">
    <div class="py-8">
      <template v-if="!allPosts.length">
        <v-alert color="yellow darken-3" outlined prominent text type="info">
          Il n'y a aucun message :(
        </v-alert>
      </template>
      <template v-else>
        <v-card
          v-for="(post, index) in allPosts"
          :key="index"
          class="mx-auto mb-4"
        >
          <v-app-bar flat>
            <v-toolbar-title class="title">{{ post.title }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list dense nav>
                <v-list-item
                  v-for="item in menu"
                  :key="item.title"
                  link
                  @click="deleteAPost(post.id)"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar>

          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline text-end">
                {{ date(post.createdAt) }}
              </div>
              <div>{{ post.description }}</div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </template>
    </div>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import PostService from "../../services/PostService";

export default Vue.extend({
  name: "PostList",

  data() {
    return {
      menu: [{ title: "Supprimer", icon: "mdi-delete" }],
    };
  },

  methods: {
    ...mapActions(["fetchPosts", "deletePost"]),
    date() {
      const date: any = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      return date;
    },
    deleteAPost(id: number) {
      this.deletePost(id);
    },
  },
  computed: mapGetters(["allPosts"]),
  mounted() {
    this.fetchPosts();
  },
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
