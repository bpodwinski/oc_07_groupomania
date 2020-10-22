<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="480" elevation="10">
      <v-app-bar flat dark center color="indigo">
        <v-toolbar-title>Connexion</v-toolbar-title>
      </v-app-bar>

      <validation-observer ref="loginForm" v-slot="{ invalid }">
        <v-form @submit.prevent="submit" class="px-5 py-2">
          <v-container>
            <v-row>
              <v-col cols="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="E-mail"
                  rules="required|email|max:128"
                >
                  <v-text-field
                    prepend-icon="mdi-email"
                    :error-messages="errors"
                    v-model="email"
                    :counter="128"
                    label="E-mail"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12">
                <validation-provider
                  v-slot="{ errors }"
                  name="Mot de passe"
                  rules="required|min:6|max:128"
                >
                  <v-text-field
                    prepend-icon="mdi-lock"
                    :error-messages="errors"
                    v-model="password"
                    :counter="128"
                    type="password"
                    label="Mot de passe"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>

            <span v-if="error">{{ error }}</span>

            <v-card-actions>
              <v-btn
                block
                depressed
                type="submit"
                :disabled="invalid"
                color="indigo lighten-2 white--text"
                >Se connecter</v-btn
              >
            </v-card-actions>
          </v-container>
        </v-form>
      </validation-observer>
    </v-card>
  </v-container>
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
  name: "Login",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      valid: true,
      email: null,
      password: null,
    };
  },

  methods: {
    ...mapActions(["Login"]),
    submit() {
      this.$refs.loginForm.validate();
      this.Login({
        email: this.email,
        password: this.password,
      });
    },
  },

  computed: mapGetters(["user", "error"]),
});
</script>
