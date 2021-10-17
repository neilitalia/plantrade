<template>
  <div>
    <h1>CHECKOUT</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Checkout",
  mounted() {
    this.setActivePage("Checkout");
  },
  computed: {
    ...mapState({
      stripe: (state) => state.stripe,
    }),
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
</style>