<template>
  <div class="center grid">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="text-center">Search through our listings</h1>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        offset="2"
        w="7"
      >
        <vs-input
          primary
          state="primary"
          v-model="searchQuery"
          @change="setSearchQuery"
          class="listings-search-bar"
        >
        </vs-input>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="1">
        <vs-button size="xl" @click="getListingsFromSearch(searchQuery)">
          <i class="bx bx-search-alt" />&nbsp;&nbsp;Search
        </vs-button>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-row>
        <vs-col
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          offset="2"
          w="8"
          class="pt-15vh"
        >
          <vs-row>
            <vs-col
              v-for="listing in listings"
              :key="listing.createdAt"
              vs-justify="center"
              vs-align="center"
              w="4"
            >
              <ListingCard :listing="listing" />
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>
    </vs-row>
    <ListingDialog />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ListingCard from "../components/ListingCard";
import ListingDialog from "../components/ListingDialog";
export default {
  components: { ListingCard, ListingDialog },
  name: "Listings",
  created() {
    this.getRecentListings();
  },
  mounted() {
    this.setActivePage("Listings");
  },
  computed: {
    ...mapState({
      listings: (state) => state.listings.listings,
      searchQuery: (state) => state.listings.searchQuery,
    }),
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
    ...mapActions("listings", [
      "getRecentListings",
      "setSearchQuery",
      "getListingsFromSearch",
    ]),
  },
};
</script>

<style>
.listings-search-bar > * > input,
label {
  height: 70px;
  font-size: 30px;
}
</style>