<template>
  <div><h1 class="text-center">Sell with us</h1></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Sell",
  mounted() {
    this.setActivePage("Sell");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
</style>