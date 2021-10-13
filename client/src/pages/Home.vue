<template>
  <div>
    <h1>HOME</h1>
    <Notification />
  </div>
</template>

<script>
import Notification from "../components/Notification";
export default {
  components: { Notification },
  name: "Home",
  data: () => ({}),
  mounted() {
    this.$store.dispatch("setActivePage", "Home");
  },
};
</script>

<style>
</style>