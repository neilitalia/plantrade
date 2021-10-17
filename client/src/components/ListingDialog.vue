<template>
  <vs-dialog
    not-padding
    scroll
    overflow-hidden
    v-model="openListingDialog"
    class="listing-dialog center grid"
  >
    <vs-row vs-justify="space-between">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <div class="con-image">
          <img
            v-if="!selectedListingDetails.image_listing.length"
            :src="placeholder"
            alt="Plant placeholder image"
          />
          <img
            v-else
            :src="
              awsBaseUrl + selectedListingDetails.image_listing[0].file_name
            "
            alt="Plant photo"
          />
        </div>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <vs-row justify="center" align="center">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="10">
            <h2 class="listing-card-title">
              {{ selectedListingDetails.title }}
            </h2>
            <h2>${{ selectedListingDetails.price }}</h2>
            <h3 class="listing-card-subtitle">
              {{ selectedListingDetails.plant }}
            </h3>
            <h3>{{ selectedListingDetails.quantity }} left</h3>
            <p class="listing-card-body">
              {{ selectedListingDetails.description }}
            </p>
            <p class="listing-card-body">
              Posted by {{ selectedListingDetails.listing_owner.username }} on
              {{ formatDate(selectedListingDetails.createdAt) }}
            </p>
            <p class="listing-card-body">
              {{ selectedListingDetails.views }} views
            </p>
            <vs-row align="center">
              <vs-button v-if="!authenticated" @click="toggleAuthDialog">
                <span class="span">Log in</span>
              </vs-button>
              <vs-button v-if="!authenticated" to="/#register">
                Create an account
              </vs-button>
              <vs-button
                primary
                icon
                :disabled="!authenticated || !selectedCartID"
                @click="handleAddToCart"
              >
                <i class="bx bx-cart"></i>
                <span class="span">Add to cart</span>
              </vs-button>
              <vs-select
                state="dark"
                placeholder="Select cart"
                v-model="selectedCartID"
                v-if="authenticated"
              >
                <vs-option
                  v-for="cart in userCartsList.cart_owner"
                  :key="cart.id"
                  :label="cart.name"
                  :value="cart.id"
                  >{{ cart.name }}</vs-option
                >
              </vs-select>
            </vs-row>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </vs-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { AWS_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../globals";
export default {
  name: "ListingDialog",
  data: () => ({
    awsBaseUrl: AWS_BASE_URL,
    placeholder: IMAGE_PLACEHOLDER_URL,
    selectedCartID: "",
  }),
  computed: {
    ...mapState({
      selectedListing: (state) => state.listings.selectedListing,
      selectedListingDetails: (state) => state.listings.selectedListingDetails,
      authenticated: (state) => state.auth.authenticated,
      userCartsList: (state) => state.cart.userCartsList,
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
    ...mapActions("listings", [
      "setSelectedListing",
      "resetSelectedListing",
      "resetSelectedListingDetails",
    ]),
    ...mapActions("cart", ["addToCart"]),
    ...mapActions("auth", ["toggleAuthDialog"]),
    formatDate(rawDate) {
      return Date(Date.parse(rawDate) * 1000)
        .toLocaleString("en-us")
        .split(" ")
        .slice(1, 4)
        .join(" ");
    },
    handleAddToCart() {
      const payload = {
        cartId: this.selectedCartID,
        listingId: this.selectedListing,
      };
      this.addToCart(payload);
    },
  },
};
</script>

<style>
.con-image {
  border-radius: 20px;
}
.con-image > img {
  display: block;
  position: relative;
  border-radius: inherit;
  width: 100%;
}
.listing-card-title {
  font-size: 2.3rem;
  line-height: 2.5rem;
  margin-bottom: 0;
}
.listing-card-subtitle {
  font-size: 1.5rem;
  margin: 0;
  line-height: 1rem;
}
.listing-card-body {
  margin: 5px auto;
}
</style>