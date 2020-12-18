<template>
  <v-container class="login">
    <v-row>
      <v-col cols="12" class="mx-auto my-12">
        <v-card elevation="6">
          <v-app-bar flat dark center color="indigo">
            <v-toolbar-title>{{ $t("login") }}</v-toolbar-title>
          </v-app-bar>

          <ValidationObserver ref="loginForm" v-slot="{ invalid }">
            <v-form @submit.prevent="loginRequest">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|email|max:128"
                    >
                      <v-text-field
                        prepend-icon="mdi-email"
                        :error-messages="errors"
                        v-model="email"
                        :counter="128"
                        :label="$t('email')"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|min:6|max:128"
                    >
                      <v-text-field
                        prepend-icon="mdi-lock"
                        :error-messages="errors"
                        v-model="password"
                        :counter="128"
                        type="password"
                        :label="$t('password')"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <v-card-actions class="d-flex justify-center">
                  <transition name="fade" mode="out-in">
                    <v-btn
                      key="login-success"
                      v-if="login.logged"
                      depressed
                      color="success white--text"
                      ><v-icon dark left>
                        mdi-check
                      </v-icon>
                      {{ $t("login.success") }}</v-btn
                    >
                    <v-btn
                      key="not-logged"
                      v-else
                      depressed
                      type="submit"
                      :loading="loading"
                      :disabled="invalid"
                      color="indigo lighten-2 white--text"
                    >
                      {{ $t("login") }}
                    </v-btn>
                  </transition>
                </v-card-actions>
              </v-container>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-alert
          type="error"
          v-show="login.alert"
          transition="slide-x-transition"
          text
        >
          <template v-if="login.error.type === 1">
            {{ $t("login.error.usernotfound") }}
          </template>
          <template v-if="login.error.type === 2">
            {{ $t("login.error.badpassword") }}
          </template>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, namespace } from "vuex-class";
import { ValidationObserver, ValidationProvider } from "vee-validate";

const login = namespace("login");
const account = namespace("account");

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class Login extends Vue {
  private valid = false;
  private loading = false;
  private email = "";
  private password = "";
  @State login;

  @login.Action
  private Login!: (credentials: object) => Promise<void | any>;

  public async loginRequest() {
    this.loading = true;
    //this.$refs.loginForm.validate(); // TODO: Fix vue validate in TS
    await new Promise(sleep => setTimeout(sleep, 1000));

    await this.Login({
      email: this.email,
      password: this.password,
    });

    this.loading = false;
  }
}
</script>

<style lang="scss">
.login {
  max-width: 480px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
