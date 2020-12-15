<template>
  <div id="home" class="home mt-10">
    <AddPost class="post-add" />
    <PostList class="post-list" />
  </div>
</template>

<script>
import PostList from "../components/Post/PostList.vue";
import AddPost from "../components/Post/AddPost.vue";

export default {
  name: "Home",

  components: {
    PostList,
    AddPost,
  },
};
</script>
