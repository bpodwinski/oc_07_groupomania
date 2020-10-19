<template>
  <v-col cols="12">
    <v-form>
      <v-text-field v-model="title" label="Title"></v-text-field>
      <v-text-field v-model="description" label="Description"></v-text-field>
      <v-text-field v-model="text" label="Text"></v-text-field>
      <v-btn
        color="success"
        type="submit"
        @click="submit(userID, title, description, text)"
        >Envoyer</v-btn
      >
    </v-form>
  </v-col>
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
      text: null
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
    }
  }
});
</script>
