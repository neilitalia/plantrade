<template>
  <h1>LISTINGS</h1>
</template>

<script>
export default {
  name: "Listings",
  mounted() {
    this.$store.commit("setActivePage", "Listings");
  },
};
</script>

<style>
</style>