import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const requiresAuth = (to: any, from: any, next: Function) => {
  if (store.state.login.logged === false) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const isLogged = (to: any, from: any, next: Function) => {
  if (store.state.login.logged === true) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home.vue"),
    beforeEnter: requiresAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    beforeEnter: isLogged,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/register/index.vue"),
    beforeEnter: isLogged,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () => import("@/views/profile/index.vue"),
    beforeEnter: requiresAuth,
  },
];

Vue.use(VueRouter);

export default new VueRouter({
  routes,
});
