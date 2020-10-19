<template>
  <v-container>
    <v-card class="mx-auto my-12">
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card-title>Créer un compte</v-card-title>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="firstname"
                type="text"
                :rules="[rules.firstname]"
                label="Prénom"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="lastname"
                type="text"
                :rules="[rules.lastname]"
                label="Nom"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="service"
                type="text"
                :rules="[rules.service]"
                label="Service"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                @focusout="keelItWithFire"
                class="email"
                v-model="email"
                :rules="[rules.email]"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="password"
                :rules="[rules.password]"
                type="password"
                label="Mot de passe"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="confPassword"
                :rules="[rules.confPassword]"
                type="password"
                label="Mot de passe"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <span v-if="error">{{ error }}</span>

          <v-card-actions>
            <v-btn
              @click="onSubmit"
              :disabled="!valid"
              color="success"
              class="mr-4"
              >Connexion</v-btn
            >
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { required, email, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import Gravatar from "vue-gravatar";
import { mapGetters, mapActions } from "vuex";

Vue.component("v-gravatar", Gravatar);

export default Vue.extend({
  name: "Register",
  data() {
    return {
      valid: true,
      email: null,
      firstname: null,
      lastname: null,
      service: null,
      password: null,
      confPassword: null,
      rules: {
        firstname: (v) =>
          /^[\s\w-éàëêâ]{2,23}$/.test(v) || "Le prénom est invalide",
        lastname: (v) =>
          /^[\s\w-éàëêâ]{2,23}$/.test(v) || "Le nom est invalide",
        service: (v) =>
          /^[\s\w-éàëêâ]{2,23}$/.test(v) || "Le prénom est invalide",
        password: (v) =>
          /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,24}$/.test(v) ||
          "Le mot de passe est invalide",
        confPassword: (v) =>
          (/^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,24}$/.test(v) &&
            v === this.password) ||
          "Le mot de passe ne correspond pas",
        email: (v) =>
          /^\w{3,}@\w{3,}\.\w{2,3}$/.test(v) ||
          "L'email est invalide, ex. d'e-mail valide: john@doe.com",
      },
    };
  },
  methods: {
    keelItWithFire(e) {
      e.preventDefault();
      let dataTest: any = document.querySelector(".email input");
      dataTest = dataTest.value;
      console.log(dataTest);
      return dataTest;
    },
    ...mapActions(["Register", "Login"]),
    onSubmit(e) {
      e.preventDefault();
      this.Register({
        firstname: this.firstname,
        lastname: this.lastname,
        service: this.service,
        email: this.email,
        password: this.password,
      }).then(() => {
        this.Login({ email: this.email, password: this.password });
      });
    },
    validate() {
      this.$refs.form.validate();
    },
  },
  computed: mapGetters(["user", "error"]),
});
</script>
