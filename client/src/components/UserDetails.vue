<template>
  <div>
    <vs-avatar size="70" badge badge-color="#28164F">
      <i class="bx bx-user"></i>
      <template #badge>
        {{ userListings.length }}
      </template>
    </vs-avatar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserDetails",
  computed: {
    ...mapState("profile", ["userDetails", "userListings"]),
  },
};
</script>

<style>
</style>