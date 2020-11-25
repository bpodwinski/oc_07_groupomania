<template>
  <v-card class="mx-auto my-12" elevation="3">
    <v-app-bar flat dark center color="indigo">
      <v-icon class="mr-4">mdi-account</v-icon>
      <v-toolbar-title>{{ $t("profile") }}</v-toolbar-title>
    </v-app-bar>

    <validation-observer ref="userForm" v-slot="{ invalid }">
      <v-form @submit.prevent="submit" class="px-5 py-2">
        <v-container>
          <v-row>
            <v-col cols="12" class="d-flex justify-center"
              ><v-gravatar :email="user.email" alt="Avatar" :size="150" />
            </v-col>
            <v-col cols="12">
              <validation-provider
                v-slot="{ errors }"
                name="First name"
                rules="required|max:128"
              >
                <v-text-field
                  :error-messages="errors"
                  :counter="128"
                  label="First name"
                  v-model="user.firstname"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12">
              <validation-provider
                v-slot="{ errors }"
                name="Last name"
                rules="required|max:128"
              >
                <v-text-field
                  :error-messages="errors"
                  :counter="128"
                  label="Last name"
                  v-model="user.lastname"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12">
              <validation-provider
                v-slot="{ errors }"
                name="E-mail"
                rules="required|email|max:128"
              >
                <v-text-field
                  :error-messages="errors"
                  :counter="128"
                  label="E-mail"
                  v-model="user.email"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12">
              <validation-provider
                v-slot="{ errors }"
                name="Service"
                rules="required|max:128"
              >
                <v-text-field
                  :error-messages="errors"
                  :counter="128"
                  label="Service"
                  v-model="user.service"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn
              block
              depressed
              type="submit"
              :disabled="invalid"
              color="indigo lighten-2 white--text"
              >{{ $t("update") }}</v-btn
            >
          </v-card-actions>
        </v-container>
      </v-form>
    </validation-observer>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Gravatar from "vue-gravatar";
import { mapGetters, mapActions } from "vuex";
import UserService from "../services/UserService";
import { required, email, max } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";

Vue.component("v-gravatar", Gravatar);

extend("required", {
  ...required,
  message: "Ne peux pas être vide",
});

extend("max", {
  ...max,
  message: "Ne doit pas dépasser {length} caractères",
});

extend("email", {
  ...email,
  message: "L'email doit être valide",
});

export default Vue.extend({
  name: "Account",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      user: {},
    };
  },

  methods: {
    // get user datas
    async getUser() {
      const res: any = await UserService.getUser(this.$route.params.id);
      this.user = res.data;
    },

    // submit valid user informations
    submit() {
      this.$refs.userForm.validate();
      UserService.updateUser(this.$route.params.id, this.user);
    },
  },

  created() {
    this.getUser();
  },
});
</script>
