<template>
  <div>
    <v-select
      class="switchlocale"
      v-model="$i18n.locale"
      :items="langs"
      dense
      outlined
    ></v-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SwitchLocale extends Vue {
  private langs: string[] = ["en", "fr"];
}
</script>

<style lang="scss">
.switchlocale {
  margin: 25px 15px 0 0 !important;
  max-width: 80px !important;
}
</style>
