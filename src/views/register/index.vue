<template>
  <v-card class="mx-auto my-12" max-width="500" elevation="3">
    <v-app-bar flat dark center color="indigo">
      <v-toolbar-title>{{ $t("register") }}</v-toolbar-title>
    </v-app-bar>

    <validation-observer ref="registerForm" v-slot="{ invalid }">
      <v-form @submit.prevent="register">
        <v-container>
          <v-row>
            <v-col cols="12">
              <validation-provider v-slot="{ errors }" rules="required|max:128">
                <v-text-field
                  :error-messages="errors"
                  v-model="firstname"
                  :counter="128"
                  type="text"
                  :label="$t('firstname')"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12">
              <validation-provider v-slot="{ errors }" rules="required|max:128">
                <v-text-field
                  :error-messages="errors"
                  v-model="lastname"
                  :counter="128"
                  type="text"
                  :label="$t('lastname')"
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
                  v-model="service"
                  type="text"
                  :counter="128"
                  :label="$t('division')"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12">
              <validation-provider
                v-slot="{ errors }"
                rules="required|email|max:128"
              >
                <v-text-field
                  :error-messages="errors"
                  class="email"
                  v-model="email"
                  :label="$t('email')"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
              <validation-provider v-slot="{ errors }" rules="required|max:128">
                <v-text-field
                  :error-messages="errors"
                  v-model="password"
                  type="password"
                  :label="$t('password')"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" md="6">
              <validation-provider v-slot="{ errors }" rules="required|max:128">
                <v-text-field
                  :error-messages="errors"
                  v-model="confirmPassword"
                  type="password"
                  :label="$t('confirmPassword')"
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <span v-if="error">{{ error }}</span>

          <v-card-actions>
            <v-btn
              color="indigo lighten-2 white--text"
              outlined
              :to="{ name: 'Login' }"
              >{{ $t("return") }}</v-btn
            >

            <v-spacer></v-spacer>

            <v-btn
              depressed
              type="submit"
              :disabled="invalid"
              color="indigo lighten-2 white--text"
              >{{ $t("register") }}</v-btn
            >
          </v-card-actions>
        </v-container>
      </v-form>
    </validation-observer>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { required, email, min, max } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";

extend("required", {
  ...required,
  message: "Ne peux pas être vide",
});

extend("min", {
  ...min,
  message: "Doit avoir au moins {length} caractères",
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
  name: "Register",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      valid: true,
      email: null,
      firstname: null,
      lastname: null,
      service: null,
      password: null,
      confirmPassword: null,
    };
  },

  methods: {
    ...mapActions(["Register", "Login"]),

    async register() {
      this.$refs.registerForm.validate();
      await this.Register({
        firstname: this.firstname,
        lastname: this.lastname,
        service: this.service,
        email: this.email,
        password: this.password,
      }).then(() => {
        this.Login({ email: this.email, password: this.password });
      });
    },
  },

  computed: mapGetters(["user", "error"]),
});
</script>
