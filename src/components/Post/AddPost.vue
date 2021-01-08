<template>
  <v-card>
    <v-card-title>{{ $t("post.create") }}</v-card-title>
    <ValidationObserver ref="postForm" v-slot="{ invalid }">
      <v-form @submit.prevent="postRequest">
        <v-container>
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                v-slot="{ validate, errors }"
                rules="required|max:128"
              >
                <v-text-field
                  v-model="post.title"
                  :error-messages="errors"
                  @change="validate"
                  :counter="128"
                  :label="$t('post.title')"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider v-slot="{ validate, errors }" rules="image">
                <v-file-input
                  type="file"
                  v-model="post.image"
                  :error-messages="errors"
                  @change="validate"
                  accept="image/png, image/jpeg"
                  :label="$t('post.image')"
                ></v-file-input>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ validate, errors }"
                rules="required|max:512"
              >
                <v-textarea
                  v-model="post.content"
                  :error-messages="errors"
                  @change="validate"
                  :counter="512"
                  :label="$t('post.body')"
                  required
                ></v-textarea>
              </ValidationProvider>

              <v-btn
                color="indigo lighten-2 white--text"
                type="submit"
                :disabled="invalid"
                >{{ $t("send") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { ValidationObserver, ValidationProvider } from "vee-validate";

const post = namespace("post");
const login = namespace("login");

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class AddPost extends Vue {
  private post: any = {
    title: "",
    content: "",
    image: "",
  };
  @State(state => state.login.userId) userId: number;

  @post.Action
  private addPost!: (post: object) => Promise<void | any>;

  public async postRequest(): Promise<void | any> {
    const formData = new FormData();
    formData.append("userId", String(this.userId));
    formData.append("title", this.post.title);
    formData.append("content", this.post.content);
    formData.append("image", this.post.image);

    console.log(formData);

    await this.addPost(formData);
  }
}
</script>
