<template>
  <h1>CHECKOUT</h1>
</template>

<script>
export default {
  name: "Checkout",
  mounted() {
    this.$store.dispatch("setActivePage", "Checkout");
  },
};
</script>

<style>
</style>