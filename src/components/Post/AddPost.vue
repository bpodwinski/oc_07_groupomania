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
              @click="sendPost(userID, title, description, text)"
              >{{ $t("send") }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const post = namespace("post");

@Component
export default class AddPost extends Vue {
  // datas
  private userID: number = this.$store.getters["user"].userId;
  private data: object = {
    title: "",
    description: "",
    text: "",
  };

  // map actions
  @post.Action
  public addPost!: any;

  // methods
  public sendPost(
    userID: number,
    title: string,
    description: string,
    text: string
  ): void {
    this.addPost({ userID, title, description, text }).then(() => {
      title = "";
      description = "";
      text = "";
    });
  }
}
</script>
