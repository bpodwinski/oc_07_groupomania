<template>
  <v-col cols="12">
    <v-form>
      <v-text-field v-model="title" label="Title"></v-text-field>
      <v-text-field v-model="description" label="Description"></v-text-field>
      <v-textarea
        name="input-7-1"
        label="Default style"
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        hint="Hint text"
      ></v-textarea>
      <vue-easymde v-model="text" label="Text" ref="markdownEditor" />
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
import VueEasymde from "vue-easymde";

export default Vue.extend({
  name: "AddPost",

  components: {
    VueEasymde,
  },

  data() {
    return {
      userID: this.$store.getters["user"].userId,
      title: null,
      description: null,
      text: null,
    };
  },

  computed: {
    easymde() {
      return this.$refs.markdownEditor.easymde;
    },
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

<style>
@import "~easymde/dist/easymde.min.css";
</style>
