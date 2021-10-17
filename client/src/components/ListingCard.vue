<template>
  <vs-card class="mb-25 plr-12" @click="handleCardClick(listing.id)">
    <template #title>
      <h3>{{ listing.title }}</h3>
    </template>
    <template #img>
      <img
        v-if="!listing.image_listing.length"
        :src="placeholder"
        alt="Plant placeholder image"
      />
      <img
        v-else
        :src="awsBaseUrl + listing.image_listing[0].file_name"
        alt="Plant photo"
      />
    </template>
    <template #text>
      <p>{{ formatListingDescription() }}</p>
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
      <vs-tooltip v-if="inProfile">
        <vs-button class="btn-chat" primary icon>
          <i class="bx bx-edit-alt"></i>
        </vs-button>
        <template #tooltip> Edit Listing </template>
      </vs-tooltip>
      <vs-tooltip v-if="inProfile">
        <vs-button
          class="btn-chat"
          danger
          icon
          @click="setListingIdToDelete(listing.id), toggleDeleteDialog()"
        >
          <i class="bx bx-trash"></i>
        </vs-button>
        <template #tooltip> Delete Listing </template>
      </vs-tooltip>
      <vs-tooltip v-if="inCart">
        <vs-button
          class="btn-chat"
          warn
          icon
          @click="removeFromCart({ cartId: cart.id, listingId: listing.id })"
        >
          <i class="bx bx-trash"></i>
        </vs-button>
        <template #tooltip> Remove from cart </template>
      </vs-tooltip>
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
        <vs-button shadow primary class="no-pointer">
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
import { mapState, mapActions } from "vuex";
import { AWS_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../globals";
export default {
  name: "ListingCard",
  props: ["inListings", "listing", "inCart", "cart", "inProfile"],
  data: () => ({
    awsBaseUrl: AWS_BASE_URL,
    placeholder: IMAGE_PLACEHOLDER_URL,
  }),
  computed: {
    ...mapState({
      activePage: (state) => state.navigation.activePage,
    }),
    openListingDialog: {
      get() {
        return this.$store.state.listings.openListingDialog;
      },
      set() {
        this.$store.commit("listings/toggleListingDialog");
      },
    },
  },
  methods: {
    ...mapActions("listings", ["setSelectedListing", "getListingDetails"]),
    ...mapActions("profile", ["toggleDeleteDialog", "setListingIdToDelete"]),
    ...mapActions("cart", [
      "removeFromCart",
      "incrementCartItem",
      "decrementCartItem",
    ]),
    handleCardClick(id) {
      if (this.$props.inListings) {
        this.setSelectedListing(id);
        this.getListingDetails(id);
        this.$store.commit("listings/toggleListingDialog");
      }
    },
    formatListingDescription() {
      return this.$props.listing.description.length > 40
        ? this.$props.listing.description.substr(0, 40) + "..."
        : this.$props.listing.description;
    },
  },
};
</script>

<style>
</style>