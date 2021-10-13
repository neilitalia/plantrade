<template>
  <h1>ORDERS</h1>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Orders",
  mounted() {
    this.setActivePage("Orders");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
</style>