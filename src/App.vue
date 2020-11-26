<template>
  <v-app>
    <v-app-bar app color="indigo darken-3" dark>
      <v-toolbar-title hidden>Groupomania</v-toolbar-title>

      <router-link :to="'/'">
        <v-img
          alt="Groupomania"
          class="shrink ml-5"
          contain
          src="/img/logo-white.svg"
          width="200"
        />
      </router-link>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = true"
      ></v-app-bar-nav-icon>

      <SwitchLanguage />
      <AuthMenu />
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import SwitchLanguage from "@/components/SwitchLanguage.vue";
import AuthMenu from "@/components/Nav/AuthMenu.vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "App",

  components: {
    SwitchLanguage,
    AuthMenu,
  },

  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  methods: {
    ...mapActions(["Logout"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
});
</script>
