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

      <SwitchLanguage />
      <AuthMenu />
    </v-app-bar>

    <v-main>
      <v-container class="main-container">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SwitchLanguage from "./components/Language/SwitchLanguage.vue";
import AuthMenu from "./components/Nav/AuthMenu.vue";

@Component({
  components: {
    SwitchLanguage,
    AuthMenu,
  },
})
export default class App extends Vue {
  private drawer = false;
  private group = null;
}
</script>

<style lang="scss">
.main-container {
  max-width: 980px !important;
}

.preloader-fade-enter-active,
.preloader-fade-leave-active {
  transition: opacity 0.5s;
  transition-delay: 2s;
}

.preloader-fade-enter,
.preloader-fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity, transform 0.5s;
  transition-delay: 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter {
  transform: translateY(2%);
}

.fade-leave-to {
  transform: translateY(0);
}
</style>
