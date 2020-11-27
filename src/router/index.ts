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
    component: () => import("@/views/home.vue"),
    beforeEnter: IsAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    beforeEnter: NotAuth,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/register/index.vue"),
    beforeEnter: NotAuth,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () => import("@/views/profile/index.vue"),
    beforeEnter: IsAuth,
  },
  {
    path: "/profile/:id/posts",
    name: "User Post",
    component: () => import("@/views/profile/posts.vue"),
    beforeEnter: IsAuth,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
