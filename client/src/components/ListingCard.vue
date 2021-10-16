<template>
  <vs-card class="mb-25 plr-12" @click="handleCardClick(listing.id)">
    <template #title>
      <h3>{{ listing.title }}</h3>
    </template>
    <template #img>
      <img
        v-if="!listing.image_listing.length"
        src="https://images.unsplash.com/photo-1562619227-71c891fd2799?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2626&q=80"
        alt="Plant placeholder image"
      />
      <img
        v-else
        :src="awsBaseUrl + listing.image_listing[0].file_name"
        alt="Plant photo"
      />
    </template>
    <template #text>
      <p>{{ listing.description }}</p>
    </template>
    <template #interactions>
      <vs-button success icon>
        <i class="bx bx-dollar"></i>
        <span class="span">{{ listing.price }}</span>
      </vs-button>
      <vs-button shadow primary icon>
        <i class="bx bx-show"></i>
        <span class="span">{{ listing.views }}</span>
      </vs-button>
      <vs-button
        v-if="inCart"
        class="btn-chat"
        warn
        icon
        @click="removeFromCart({ cartId: cart.id, listingId: listing.id })"
      >
        <i class="bx bx-trash"></i>
      </vs-button>
      <vs-button-group v-if="inCart">
        <vs-button
          shadow
          primary
          icon
          @click="decrementCartItem({ cartId: cart.id, listingId: listing.id })"
          :disabled="listing.cart_info.quantity < 2"
        >
          <i class="bx bx-minus-circle"></i>
        </vs-button>
        <vs-button shadow primary>
          <span class="span">{{ listing.cart_info.quantity }}</span>
        </vs-button>
        <vs-button
          shadow
          primary
          icon
          @click="incrementCartItem({ cartId: cart.id, listingId: listing.id })"
        >
          <i class="bx bx-plus-circle"></i>
        </vs-button>
      </vs-button-group>
    </template>
  </vs-card>
</template>

<script>
import { mapActions } from "vuex";
import { AWS_BASE_URL } from "../globals";
export default {
  name: "ListingCard",
  props: ["listing", "inCart", "cart"],
  data: () => ({
    awsBaseUrl: AWS_BASE_URL,
  }),
  methods: {
    ...mapActions("listings", ["setSelectedListing", "getListingDetails"]),
    ...mapActions("cart", [
      "removeFromCart",
      "incrementCartItem",
      "decrementCartItem",
    ]),
    handleCardClick(id) {
      if (!this.$props.inCart) {
        this.setSelectedListing(id);
        this.getListingDetails(id);
      }
    },
  },
};
</script>

<style>
</style>