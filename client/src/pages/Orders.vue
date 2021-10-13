<template>
  <h1>ORDERS</h1>
</template>

<script>
export default {
  name: "Orders",
  mounted() {
    this.$store.dispatch("setActivePage", "Orders");
  },
};
</script>

<style>
</style>