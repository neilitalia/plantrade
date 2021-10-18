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
    <vs-row v-for="cart in userCarts.cart_owner" :key="cart.id" class="mb-7vh">
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
          <vs-button border class="mr-20" @click="deleteCart(cart.id)">
            <i class="bx bx-trash-alt"></i>&nbsp;Delete list
          </vs-button>
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
            <vs-button
              border
              class="mr-20"
              :loading="loading"
              @click="checkOut(cart.id)"
            >
              <i class="bx bx-cart"></i>&nbsp;Secure Checkout
            </vs-button>
            <vs-button border class="mr-20" @click="deleteCart(cart.id)">
              <i class="bx bx-trash-alt"></i>&nbsp;Delete list
            </vs-button>
            <p>Subtotal: ${{ getSubTotal(cart.cart_listing) }}</p>
          </div>
        </div>
      </vs-col>
    </vs-row>
    <vs-row class="mb-15vh">
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        offset="2"
        w="8"
      >
        <vs-button size="xl" @click="toggleNewCartDialog"
          ><i class="bx bx-list-plus"></i>&nbsp;Create a new list
        </vs-button>
      </vs-col>
    </vs-row>
    <NewCartDialog />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ListingCard from "../components/ListingCard.vue";
import NewCartDialog from "../components/NewCartDialog";
export default {
  name: "Cart",
  components: { ListingCard, NewCartDialog },
  mounted() {
    this.setActivePage("Cart");
    this.getUserCartItems();
    this.getUserCartsList();
  },
  computed: {
    ...mapState({
      userCarts: (state) => state.cart.userCarts,
      loading: (state) => state.stripe.loading,
    }),
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
    ...mapActions("stripe", ["checkOut"]),
    ...mapActions("cart", [
      "getUserCartsList",
      "getUserCartItems",
      "toggleNewCartDialog",
      "deleteCart",
    ]),
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