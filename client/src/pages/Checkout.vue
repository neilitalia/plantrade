<template>
  <div>
    <h1>CHECKOUT</h1>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { mapState, mapActions } from "vuex";
export default {
  name: "Checkout",
  components: { StripeCheckout },
  mounted() {
    this.setActivePage("Checkout");
  },
  computed: {
    ...mapState({
      publishableKey: (state) => state.stripe.publishableKey,
      lineItems: (state) => state.stripe.lineItems,
      successUrl: (state) => state.stripe.successUrl,
      cancelUrl: (state) => state.stripe.cancelUrl,
      loading: (state) => state.stripe.loading,
    }),
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
</style>