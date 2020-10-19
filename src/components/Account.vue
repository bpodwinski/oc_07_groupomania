<template>
  <v-container>
    <v-row justify="space-around">
      <v-card>
        <v-app-bar flat color="rgba(0, 0, 0, 0)">
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>

        <v-card-title class="mt-8">
          <v-avatar size="64">
            <img
              alt="user"
              src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
            />
          </v-avatar>
          <p class="ml-3">{{ user.firstname }} {{ user.lastname }}</p>
        </v-card-title>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import UserService from "../services/UserService";

export default Vue.extend({
  name: "Account",

  data() {
    return {
      user: {},
    };
  },

  methods: {
    async getUser() {
      const res: any = await UserService.getUser(this.$route.params.id);
      console.log(res.data);
      this.user = res.data;
    },
  },

  created() {
    this.getUser();
  },
});
</script>
