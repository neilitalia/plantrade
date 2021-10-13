<template>
  <h1>LISTINGS</h1>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Listings",
  mounted() {
    this.setActivePage("Listings");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
</style>