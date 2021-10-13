<template>
  <h1>HOME</h1>
</template>

<script>
export default {
  name: "Home",
  data: () => ({}),
  mounted() {
    this.$store.dispatch("setActivePage", "Home");
  },
};
</script>

<style>
</style>