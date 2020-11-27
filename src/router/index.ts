import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const IsAuth = (to: any, from: any, next: Function) => {
  if (!store.getters.user.token) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const NotAuth = (to: any, from: any, next: Function) => {
  if (store.getters.user.token) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    beforeEnter: IsAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    beforeEnter: NotAuth,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    beforeEnter: NotAuth,
  },
  {
    path: "/account/:id",
    name: "Account",
    component: () => import("@/views/Account.vue"),
    beforeEnter: IsAuth,
  },
  {
    path: "/account/:id/posts",
    name: "User Post",
    component: () => import("@/views/UserPost.vue"),
    beforeEnter: IsAuth,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
