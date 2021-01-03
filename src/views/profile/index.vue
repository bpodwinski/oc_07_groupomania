<template>
  <v-card class="mx-auto my-12" elevation="3">
    <v-app-bar flat dark center color="indigo">
      <v-icon class="mr-4">mdi-account</v-icon>
      <v-toolbar-title>{{ $t("profile") }}</v-toolbar-title>
      <i class="ml-2" v-if="account.data.admin">({{ $t("administrator") }})</i>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="640">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="error" v-bind="attrs" v-on="on">
            <v-icon>mdi-close</v-icon>
            {{ $t("delete") }}
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">{{
            $t("deleteConfirm")
          }}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="removeUser(login.userId)"
              >{{ $t("yes") }}</v-btn
            >
            <v-btn color="green darken-1" text @click="dialog = false">
              {{ $t("no") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <validation-observer ref="userForm" v-slot="{ invalid }">
      <v-form @submit.prevent="userFormRequest" class="px-5 py-2">
        <v-container>
          <v-row>
            <v-col cols="12" class="d-flex justify-center">
              <v-avatar>
                <img
                  :src="gravatar"
                  :alt="account.data.firstname + ' ' + account.data.lastname"
                />
              </v-avatar>
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
                  v-model="account.data.firstname"
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
                  v-model="account.data.lastname"
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
                  v-model="account.data.email"
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
                  v-model="account.data.service"
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
export default class Account extends Vue {
  private dialog = false;
  @State account;
  @State login;

  get gravatar() {
    return this.account.data.gravatar + "?d=retro";
  }

  @account.Action
  private updateUser!: (data: object) => Promise<void | any>;

  @account.Action
  private deleteUser!: (id: number) => Promise<void | any>;

  public userFormRequest() {
    //this.$refs.loginForm.validate(); // //FIX: vue validate don't work with typescripts

    //console.log(this.account.data);

    const data: object = {
      id: this.login.userId,
      firstname: this.account.data.firstname,
      lastname: this.account.data.lastname,
      service: this.account.data.service,
      email: this.account.data.email,
    };

    this.updateUser(data);
  }

  public removeUser(id: number) {
    this.deleteUser(id);
  }
}
</script>
