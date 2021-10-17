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
        <h2>List: {{ cart.name }}</h2>
        <div v-if="!cart.cart_listing.length">
          <h2>Your {{ cart.name }} is lonely :( No items yet</h2>
        </div>
        <div v-else>
          <!-- <vs-card-group> -->
          <transition-group name="list" tag="vs-card-group">
            <div
              v-for="listing in cart.cart_listing"
              :key="listing.id"
              class="list-item"
            >
              <ListingCard :listing="listing" :inCart="true" :cart="cart" />
            </div>
          </transition-group>
          <!-- </vs-card-group> -->
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
    ...mapActions("cart", ["getUserCartItems"]),
  },
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  position: absolute;
  transition: all 0.5s;
  z-index: -10;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-item {
  transition: all 0.5s;
  display: inline-block;
}
</style>