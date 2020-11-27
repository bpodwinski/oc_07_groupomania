<template>
  <div id="userpost" class="userpost mt-10">
    <h1>{{ $t("post.my") }}</h1>
    <UserPost />
  </div>
</template>

<script>
import UserPost from "@/components/Post/UserPost";

export default {
  name: "userpost",
  components: {
    UserPost,
  },
};
</script>
