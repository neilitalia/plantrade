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
          v-on:keyup.enter="getListingsFromSearch(searchQuery)"
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
    <vs-row justify="center" align="center">
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" w="2">
        <h3 class="text-center">Sort by:</h3>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="2">
        <vs-radio v-model="sortMethod" val="Most Recent">Most Recent</vs-radio>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="2">
        <vs-radio v-model="sortMethod" val="Most Popular" @click="setSortMethod"
          >Most Popular</vs-radio
        >
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
  data: () => ({
    picked: "",
  }),
  created() {
    this.getUserCartsList();
    this.getRecentListings();
  },
  mounted() {
    this.setActivePage("Listings");
  },
  computed: {
    ...mapState({
      listings: (state) => state.listings.listings,
      searchQuery: (state) => state.listings.searchQuery,
      // sortMethod: (state) => state.listings.sortMethod,
      authenticated: (state) => state.auth.authenticated,
    }),
    sortMethod: {
      get() {
        return this.$store.state.listings.sortMethod;
      },
      set(value) {
        this.$store.commit("listings/setSortMethod", value);
      },
    },
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
    ...mapActions("cart", ["getUserCartsList"]),
    ...mapActions("listings", [
      "getRecentListings",
      "setSearchQuery",
      "getListingsFromSearch",
      "setSortMethod",
    ]),
  },
};
</script>

<style>
.listings-search-bar > * > input {
  height: 70px;
  font-size: 30px;
}
</style>