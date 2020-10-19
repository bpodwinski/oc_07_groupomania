<template>
  <v-container>
    <v-card class="mx-auto my-12">
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card-title>Connexion</v-card-title>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="email" :rules="[rules.email]" label="E-mail" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="password" :rules="[rules.password]" type="password" label="Mot de passe" required></v-text-field>
            </v-col>
          </v-row>

          <span v-if="error">{{error}}</span>

          <v-card-actions>
            <v-btn v-on:click.native="onSubmit" :disabled="!valid" color="success">Connexion</v-btn>
          </v-card-actions>

        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  name: "Login",

  data() {
    return {
      valid: true,
      email: null,
      password: null,
      rules: {
        firstname: v => /^[\s\w-éàëêâ]{2,23}$/.test(v) || "Le prénom est invalide",
        lastname: v => /^[\s\w-éàëêâ]{2,23}$/.test(v) || "Le nom est invalide",
        password: v =>
          /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,24}$/.test(v) ||
          "Le mot de passe est invalide",
        confPassword: v =>
          v === this.password || "Le mot de passe ne correspond pas",
        email: v =>
          /^\w{3,}@\w{3,}\.\w{2,3}$/.test(v) ||
          "L'email est invalide, ex. d'e-mail valide: john@doe.com"
      }
    };
  },
  methods: {
    ...mapActions(["Login"]),
    onSubmit(e) {
      e.preventDefault();
      this.Login({
        email: this.email,
        password: this.password
      });
    },
    validate() {
      this.$refs.form.validate();
    }
  },
  computed: mapGetters(["user", "error"])
});
</script>
