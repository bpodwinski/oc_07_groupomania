import Vue from "vue";
import App from "@/App.vue";
import i18n from "@/i18n";
import "@/registerServiceWorker";
import "@/filters";
import "@/vee-validate";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount("#app");
