<template>
  <div>
    <h1 class="text-center">Your Items</h1>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Cart",
  mounted() {
    this.setActivePage("Cart");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
</style>