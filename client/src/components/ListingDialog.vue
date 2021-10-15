<template>
  <vs-dialog
    not-padding
    scroll
    overflow-hidden
    v-model="$store.state.listings.selectedListing"
    class="listing-dialog center grid"
  >
    <vs-row vs-justify="space-between">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <div class="con-image">
          <img
            v-if="selectedListingDetails.image_listing.length"
            :src="
              awsBaseUrl + selectedListingDetails.image_listing[0].file_name
            "
            alt="Plant photo"
          />
          <img
            v-else
            src="https://images.unsplash.com/photo-1562619227-71c891fd2799?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2626&q=80"
            alt="Plant placeholder image"
          />
        </div>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <vs-row justify="center">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="10">
            <h3>${{ selectedListingDetails.price }}</h3>
            <h2>{{ selectedListingDetails.title }}</h2>
            <h3>{{ selectedListingDetails.quantity }} left</h3>
            <p>{{ selectedListingDetails.description }}</p>
            <p>
              Posted by {{ selectedListingDetails.listing_owner.username }} on
              {{ formatDate(selectedListingDetails.createdAt) }}
            </p>
            <p>{{ selectedListingDetails.views }} views</p>
            <vs-row>
              <vs-button primary icon>
                <i class="bx bx-cart"></i>
                <span class="span">Add to cart</span>
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
import { AWS_BASE_URL } from "../globals";
export default {
  name: "ListingDialog",
  data: () => ({
    awsBaseUrl: AWS_BASE_URL,
  }),
  computed: {
    ...mapState({
      selectedListing: (state) => state.listings.selectedListing,
      selectedListingDetails: (state) => state.listings.selectedListingDetails,
    }),
  },
  methods: {
    ...mapActions("listings", [
      "setSelectedListing",
      "resetSelectedListing",
      "resetSelectedListingDetails",
    ]),
    formatDate(rawDate) {
      return Date(Date.parse(rawDate) * 1000)
        .toLocaleString("en-us")
        .split(" ")
        .slice(1, 4)
        .join(" ");
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
</style>