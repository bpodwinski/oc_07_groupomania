<template>
  <div id="home" class="home mt-10">
    <AddPost class="post-add" />
    <PostList class="post-list" />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import PostList from "../components/Post/PostList.vue";
import AddPost from "../components/Post/AddPost.vue";

@Component({
  components: {
    PostList,
    AddPost,
  },
})
export default class Home extends Vue {}
</script>
