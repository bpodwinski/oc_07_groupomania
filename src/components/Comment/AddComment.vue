<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            append-icon="mdi-send"
            @click:append="sendComment(userID, postID, text)"
            v-model="text"
            :label="$t('comment.create')"
            filled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "AddComment",

  data() {
    return {
      userID: this.$store.getters["user"].userId,
      postID: null,
      text: null,
    };
  },

  methods: {
    ...mapActions(["addComment"]),

    sendComment(userID: any, postID: any, text: any) {
      this.addComment({ userID, postID, text }).then(() => {
        this.userID = null;
        this.postID = null;
        this.text = null;
      });
    },
  },
});
</script>
