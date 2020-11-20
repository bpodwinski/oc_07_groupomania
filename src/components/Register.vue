<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="480" elevation="10">
      <v-app-bar flat dark center color="indigo">
        <v-toolbar-title>Créer un compte</v-toolbar-title>
      </v-app-bar>

      <validation-observer ref="registerForm" v-slot="{ invalid }">
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Prénom"
                  rules="required|max:128"
                >
                  <v-text-field
                    :error-messages="errors"
                    v-model="firstname"
                    :counter="128"
                    type="text"
                    label="Prénom"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Nom"
                  rules="required|max:128"
                >
                  <v-text-field
                    :error-messages="errors"
                    v-model="lastname"
                    :counter="128"
                    type="text"
                    label="Nom"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" md="6">
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
                    label="Service"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="E-mail"
                  rules="required|email|max:128"
                >
                  <v-text-field
                    @focusout="keelItWithFire"
                    :error-messages="errors"
                    class="email"
                    v-model="email"
                    label="E-mail"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Mot de passe"
                  rules="required|max:128"
                >
                  <v-text-field
                    :error-messages="errors"
                    v-model="password"
                    type="password"
                    label="Mot de passe"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col cols="12" md="6">
                <validation-provider
                  v-slot="{ errors }"
                  name="Mot de passe"
                  rules="required|max:128"
                >
                  <v-text-field
                    :error-messages="errors"
                    v-model="confPassword"
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
                @click="onSubmit"
                type="submit"
                :disabled="invalid"
                color="indigo lighten-2 white--text"
                >Créer un compte</v-btn
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
      confPassword: null,
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
