<template>
  <div v-if="user.userId">
    <v-menu bottom offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn text v-bind="attrs" v-on="on">
          <v-gravatar
            :mail="$store.state.account.user.email"
            alt="Avatar"
            :size="30"
          />
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-if="user.userId"
          :to="{ name: 'Account', params: { id: user.userId } }"
        >
          <v-list-item-title
            ><v-icon left>mdi-account</v-icon>
            {{ $t("profile") }}</v-list-item-title
          >
        </v-list-item>
        <v-list-item :to="{ name: 'Logout' }">
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
import Vue from "vue";
import { mapGetters } from "vuex";
import Gravatar from "vue-gravatar";

Vue.component("v-gravatar", Gravatar);

export default {
  name: "AuthMenu",

  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
