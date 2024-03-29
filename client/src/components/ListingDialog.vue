<template>
  <vs-dialog
    not-padding
    scroll
    overflow-hidden
    @close="handleClose"
    v-model="openListingDialog"
    class="listing-dialog center grid"
  >
    <vs-row vs-justify="space-between" v-if="selectedListingDetails">
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
              {{ selectedListingDetails.views }} views
            </p>
            <p class="listing-card-body">
              {{ selectedListingDetails.description }}
            </p>
            <p
              class="listing-card-body"
              v-if="
                authenticated &&
                selectedListingDetails.listing_owner.id === user.id
              "
            >
              You posted this on
              {{ formatDate(selectedListingDetails.createdAt) }}
            </p>
            <p class="listing-card-body" v-else>
              Posted by {{ selectedListingDetails.listing_owner.username }} on
              {{ formatDate(selectedListingDetails.createdAt) }}
            </p>
            <vs-row align="center" v-if="!authenticated">
              <vs-button @click="toggleAuthDialog"> Log in </vs-button>
              <vs-button to="/#register"> Create an account </vs-button>
              <vs-button primary icon disabled>
                <i class="bx bx-cart"></i>
                <span class="span">Add to cart</span>
              </vs-button>
            </vs-row>
            <vs-row
              align="center"
              v-if="
                authenticated &&
                selectedListingDetails.listing_owner.id !== user.id
              "
            >
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
                v-if="authenticated"
                state="dark"
                placeholder="Select cart"
                v-model="selectedCartID"
              >
                <vs-option
                  v-for="cart in userCartsList.cart_owner"
                  :key="cart.id"
                  :label="cart.name"
                  :value="cart.id"
                >
                  {{ `${cart.name} #${cart.id}` }}
                </vs-option>
              </vs-select>
            </vs-row>
            <vs-row
              align="center"
              v-if="
                authenticated &&
                selectedListingDetails.listing_owner.id === user.id
              "
            >
              <vs-button primary icon to="/profile">
                View in your profile
              </vs-button>
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
      user: (state) => state.auth.user,
      selectedListing: (state) => state.listings.selectedListing,
      selectedListingDetails: (state) => state.listings.selectedListingDetails,
      authenticated: (state) => state.auth.authenticated,
      userCartsList: (state) => state.cart.userCartsList,
      userCarts: (state) => state.cart.userCarts,
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
    handleClose() {
      this.resetSelectedListing();
      this.resetSelectedListingDetails();
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
  line-height: 1.4rem;
}
.listing-card-body {
  margin: 5px auto;
}
</style>