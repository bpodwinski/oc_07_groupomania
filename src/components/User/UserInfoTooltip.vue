<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-avatar v-bind="attrs" v-on="on" class="mr-2">
        <img :src="user.gravatar" :alt="user.firstname + ' ' + user.lastname" />
      </v-avatar>
    </template>
    <v-row>
      <v-col cols="3">
        <div class="userinfo">
          <v-avatar size="64" v-bind="attrs" v-on="on">
            <img
              :src="user.gravatar"
              :alt="user.firstname + ' ' + user.lastname"
            />
          </v-avatar>
        </div>
      </v-col>

      <v-col cols="9">
        <h3 class="mb-1">{{ user.firstname }} {{ user.lastname }}</h3>
        <div class="service">
          <v-icon color="white" class="mr-2">
            mdi-briefcase
          </v-icon>
          <span>{{ user.service }}</span>
        </div>

        <div class="email">
          <v-icon color="white" class="mr-2">
            mdi-at
          </v-icon>
          <span>{{ user.email }}</span>
        </div>
      </v-col>
    </v-row>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class UserInfo extends Vue {
  @Prop(Object) readonly user: object;
}
</script>

<style lang="scss"></style>
