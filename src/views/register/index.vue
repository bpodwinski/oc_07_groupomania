<template>
  <v-container class="register">
    <v-row>
      <v-col cols="12" class="mx-auto my-12">
        <v-card elevation="6">
          <v-app-bar flat dark center color="indigo">
            <v-toolbar-title>{{ $t("register") }}</v-toolbar-title>
          </v-app-bar>

          <validation-observer ref="form" v-slot="{ invalid }">
            <v-form @submit.prevent="register">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required|max:128"
                    >
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
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required|max:128"
                    >
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
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required|max:128"
                    >
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
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required|max:128"
                    >
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";

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

  computed: {
    ...mapState({
      success: state => state.register.success,
    }),
  },

  methods: {
    ...mapActions(["Register", "Login"]),

    async register() {
      this.$refs.form.validate();

      await this.Register({
        firstname: this.firstname,
        lastname: this.lastname,
        service: this.service,
        email: this.email,
        password: this.password,
      });

      if (this.success === true) {
        await this.Login({
          email: this.email,
          password: this.password,
        });
      }
    },
  },
});
</script>

<style lang="scss">
.register {
  max-width: 480px;
}
</style>
