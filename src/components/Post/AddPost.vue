<template>
  <v-card>
    <v-card-title>{{ $t("post.create") }}</v-card-title>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="title"
              :label="$t('post.title')"
            ></v-text-field>
            <v-text-field
              v-model="description"
              :label="$t('post.description')"
            ></v-text-field>
            <v-textarea v-model="text" :label="$t('post.body')"></v-textarea>
            <v-btn
              color="indigo lighten-2 white--text"
              type="submit"
              @click="submit(userID, title, description, text)"
              >{{ $t("send") }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "AddPost",

  data() {
    return {
      userID: this.$store.getters["user"].userId,
      title: null,
      description: null,
      text: null,
    };
  },

  methods: {
    ...mapActions(["addPost"]),
    submit(userID: any, title: any, description: any, text: any) {
      this.addPost({ userID, title, description, text }).then(() => {
        this.title = null;
        this.description = null;
        this.text = null;
      });
    },
  },
});
</script>
