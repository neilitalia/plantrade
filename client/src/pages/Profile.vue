<template>
  <h1>PROFILE</h1>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Profile",
  mounted() {
    this.setActivePage("Profile");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
</style>