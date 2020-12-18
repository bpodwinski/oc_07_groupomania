<template>
  <div v-if="logged">
    <v-menu bottom offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn text v-bind="attrs" v-on="on">
          <v-gravatar :mail="account.data.email" alt="Avatar" :size="30" />
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-if="account.data.id"
          :to="{ name: 'Profile', params: { id: account.data.id } }"
        >
          <v-list-item-title
            ><v-icon left>mdi-account</v-icon>
            {{ $t("profile") }}</v-list-item-title
          >
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-title
            ><v-icon left>mdi-logout</v-icon>
            {{ $t("logout") }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

  <div v-else>
    <v-btn text :to="{ name: 'Register' }">
      <v-icon left>mdi-account-plus</v-icon> {{ $t("register") }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import Gravatar from "vue-gravatar";

const login = namespace("login");
const account = namespace("account");
Vue.component("v-gravatar", Gravatar);

@Component
export default class AuthMenu extends Vue {
  @State account;
  @State(state => state.login.logged) logged: boolean;

  @login.Action
  private Logout!: () => Promise<void | any>;

  public logout() {
    this.Logout();
  }
}
</script>
