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
      <h3 class="text-center plr-12">Sort by</h3>
      <vs-button-group class="plr-12">
        <vs-button flat icon>
          <i class="bx bxs-chevron-up"></i>
        </vs-button>
        <vs-button flat icon class="no-pointer"> Popularity </vs-button>
        <vs-button flat icon>
          <i class="bx bxs-chevron-down"></i>
        </vs-button>
      </vs-button-group>
      <vs-button-group class="plr-12">
        <vs-button flat icon>
          <i class="bx bxs-chevron-up"></i>
        </vs-button>
        <vs-button flat icon class="no-pointer"> Time </vs-button>
        <vs-button flat icon>
          <i class="bx bxs-chevron-down"></i>
        </vs-button>
      </vs-button-group>
      <vs-button-group class="plr-12">
        <vs-button flat icon>
          <i class="bx bxs-chevron-up"></i>
        </vs-button>
        <vs-button flat icon class="no-pointer"> Price </vs-button>
        <vs-button flat icon>
          <i class="bx bxs-chevron-down"></i>
        </vs-button>
      </vs-button-group>
      <vs-button-group class="plr-12">
        <vs-button flat icon>
          <i class="bx bxs-chevron-up"></i>
        </vs-button>
        <vs-button flat icon class="no-pointer"> Alphabetical </vs-button>
        <vs-button flat icon>
          <i class="bx bxs-chevron-down"></i>
        </vs-button>
      </vs-button-group>
      <vs-button border> Update Results</vs-button>
    </vs-row>
    <vs-row class="mb-15vh">
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
    this.getRecentListings();
  },
  mounted() {
    this.getUserCartsList();
    this.setActivePage("Listings");
  },
  computed: {
    ...mapState({
      listings: (state) => state.listings.listings,
      searchQuery: (state) => state.listings.searchQuery,
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