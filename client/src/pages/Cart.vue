<template>
  <div>
    <h1 class="text-center">Your Items</h1>
    <div v-for="cart in userCarts.cart_owner" :key="cart.id">
      <h2>{{ cart.name }}</h2>
      <vs-card-group>
        <div v-for="listing in cart.cart_listing" :key="listing.id">
          <ListingCard :listing="listing" />
        </div>
        <!-- <vs-card v-for="(card, index) in 6" :key="index" @click="handleClick">
          <template #title>
            <h3>Pot with a plant</h3>
          </template>
          <template #img>
            <img :src="`/foto${card}.png`" alt="" />
          </template>
          <template #text>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </template>
          <template #interactions>
            <vs-button danger icon>
              <i class="bx bx-heart"></i>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <i class="bx bx-chat"></i>
              <span class="span"> 54 </span>
            </vs-button>
          </template>
        </vs-card> -->
      </vs-card-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ListingCard from "../components/ListingCard.vue";
export default {
  name: "Cart",
  components: { ListingCard },
  created() {
    this.getUserCartItems();
  },
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
</style>