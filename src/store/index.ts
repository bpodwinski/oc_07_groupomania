import Vue from "vue";
import Vuex from "vuex";

// import modules
import Register from "./modules/register";
import Login from "./modules/login";
import Account from "./modules/account";
import Post from "./modules/post";
import Comment from "./modules/comment";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    register: Register,
    login: Login,
    account: Account,
    post: Post,
    comment: Comment,
  },
});
