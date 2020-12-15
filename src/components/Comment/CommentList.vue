<template>
  <div class="mt-5 mb-15">
    <template v-if="comment[index].data.length">
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ comment[index].data.length }}
            {{ $t("comment.title") }}</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-list>
              <template v-for="(comment, index) in comment">
                <v-list-item :key="index">
                  <v-list-item-content class="mb-5">
                    <v-list-item-title class="mb-2">
                      {{ comment.user.firstname }}
                      {{ comment.user.lastname }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{
                      comment.user.createdAt
                    }}</v-list-item-subtitle>
                    <v-list-item-content class="comment-text">{{
                      comment.text
                    }}</v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const comment = namespace("comment");

@Component
export default class PostList extends Vue {
  private comment: object[];
  private userID: number = this.$store.getters["user"].userId;

  @comment.Action
  private getComment!: (postId: number) => Promise<void | any>;
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.comment-text {
  background-color: rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
}
</style>
