<template>
  <div id="home" class="home">
    <PostList msg="PostList" />
    <AddPost />
  </div>
</template>

<script>
import PostList from "@/components/Post/PostList";
import AddPost from "@/components/Post/AddPost";

export default {
  name: "Home",
  components: {
    PostList,
    AddPost,
  },
};
</script>
