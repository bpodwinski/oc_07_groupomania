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

    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="indigo--text text--accent-4"
        >
          <v-list-item v-for="item in menu" :key="item.title" :to="item.path">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

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
import moment from "moment";

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
      menu: [
        {
          title: "Créer un compte",
          name: "Register",
          icon: "mdi-account-plus",
        },
        { title: "Connexion", name: "Login", icon: "mdi-account" },
      ],
      menuLogged: [
        { title: "Mon compte", name: "Account", icon: "mdi-account" },
        {
          title: "Déconnexion",
          name: "Logout",
          icon: "mdi-logout",
        },
      ],
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
