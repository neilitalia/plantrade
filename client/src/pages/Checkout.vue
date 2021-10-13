<template>
  <h1>CHECKOUT</h1>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Checkout",
  mounted() {
    this.setActivePage("Checkout");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
</style>