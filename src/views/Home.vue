<template>
  <div id="home" class="home mt-10">
    <PostList class="post-list" />
  </div>
</template>

<script>
import PostList from "@/components/Post/PostList";
import AddPost from "@/components/Post/AddPost";

export default {
  name: "Home",

  components: {
    PostList,
  },
};
</script>
