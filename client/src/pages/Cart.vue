<template>
  <div class="center grid">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="text-center">Your Items</h1>
      </vs-col>
    </vs-row>
    <vs-row v-if="!userCarts.cart_owner.length">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h3 class="text-center">No items yet...</h3>
      </vs-col>
    </vs-row>
    <vs-row v-for="cart in userCarts.cart_owner" :key="cart.id" class="mb-15vh">
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        offset="2"
        w="8"
      >
        <div class="cart-info">
          <h2>List: {{ cart.name }}</h2>
          <h2># {{ cart.id }}</h2>
        </div>
        <div v-if="!cart.cart_listing.length">
          <h2>Your {{ cart.name }} is lonely :( No items yet</h2>
        </div>
        <div v-else>
          <transition-group name="list" tag="vs-card-group">
            <div
              v-for="listing in cart.cart_listing"
              :key="listing.id"
              class="list-item"
            >
              <ListingCard :listing="listing" :inCart="true" :cart="cart" />
            </div>
          </transition-group>
          <div class="subtotal-checkout">
            <vs-button border class="mr-20" @click="checkOut(cart.id)">
              <i class="bx bx-cart"></i>&nbsp;Checkout
            </vs-button>
            <vs-button border class="mr-20" @click="checkOut(cart.id)">
              <i class="bx bx-trash-alt"></i>&nbsp;Delete list
            </vs-button>
            <p>Subtotal: ${{ getSubTotal(cart.cart_listing) }}</p>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ListingCard from "../components/ListingCard.vue";
export default {
  name: "Cart",
  components: { ListingCard },
  mounted() {
    this.setActivePage("Cart");
  },
  computed: {
    ...mapState({
      userCarts: (state) => state.cart.userCarts,
    }),
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
    ...mapActions("stripe", ["checkout"]),
    ...mapActions("cart", ["getUserCartItems"]),
    getSubTotal(items) {
      const rawSubTotal = items.reduce((acc, item) => {
        return acc + item.price * item.cart_info.quantity;
      }, 0);
      return parseFloat(rawSubTotal).toFixed(2);
    },
  },
};
</script>

<style>
.subtotal-checkout {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.cart-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>