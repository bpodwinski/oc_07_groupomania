import store from "@/store";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const requiresAuth = (to: any, from: any, next: Function) => {
  if (!store.state.login.token) {
    next({ name: "Login" });
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
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/register/index.vue"),
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
