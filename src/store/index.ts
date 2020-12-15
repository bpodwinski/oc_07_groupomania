import Vue from "vue";
import Vuex from "vuex";

// import modules
import Register from "@/store/modules/register";
import Login from "@/store/modules/login";
import Account from "@/store/modules/account";
import Post from "@/store/modules/post";
import Comment from "@/store/modules/comment";

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
