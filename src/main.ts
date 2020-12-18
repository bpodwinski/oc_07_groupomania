import Vue from "vue";
import App from "@/App.vue";
import i18n from "@/i18n";
import "./registerServiceWorker";
import "./filters";
import "./vee-validate";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import jwtDecode, { JwtPayload } from "jwt-decode";

Vue.config.productionTip = false;

// Decode token if exist and retrieve user session
const token = sessionStorage.getItem("token");

if (token) {
  const decodedToken = jwtDecode<JwtPayload>(token);
  if (decodedToken.exp! * 1000 >= Date.now()) {
    const userId: number = decodedToken.userId;

    store.dispatch("login/authUser", { decodedToken, token });
    store.dispatch("account/getUser", userId);
  } else if (decodedToken.exp! * 1000 < Date.now()) {
    store.dispatch("login/Logout");
  }
}

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount("#app");
