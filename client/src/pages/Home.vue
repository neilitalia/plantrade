<template>
  <div>
    <h1>HOME</h1>
    <Notification />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Notification from "../components/Notification";
export default {
  components: { Notification },
  name: "Home",
  mounted() {
    this.setActivePage("Home");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
</style>