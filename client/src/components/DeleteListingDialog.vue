<template>
  <vs-dialog auto-width not-center v-model="openDeleteDialog">
    <template #header>
      <h4 class="not-margin">Are you sure you want to delete this?</h4>
    </template>
    <div class="con-content">
      <p>
        This will take your listing off our market and off of other people's
        carts and wishlists. You can post a new listing when you're ready to
        sell this again.
      </p>
    </div>
    <template #footer>
      <div class="con-footer">
        <vs-button dark flat @click="deleteListing"> Yes, I'm sure. </vs-button>
        <vs-button
          dark
          :active="true"
          flat
          @click="toggleDeleteDialog(), resetListingIdToDelete()"
        >
          Cancel
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DeleteListingDialog",
  computed: {
    openDeleteDialog: {
      get() {
        return this.$store.state.profile.openDeleteDialog;
      },
      set() {
        this.$store.commit("profile/toggleDeleteDialog");
      },
    },
  },
  methods: {
    ...mapActions("profile", [
      "deleteListing",
      "toggleDeleteDialog",
      "resetListingIdToDelete",
    ]),
  },
};
</script>

<style>
</style>