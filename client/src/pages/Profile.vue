<template>
  <h1>PROFILE</h1>
</template>

<script>
export default {
  name: "Profile",
  mounted() {
    this.$store.dispatch("setActivePage", "Profile");
  },
};
</script>

<style>
</style>