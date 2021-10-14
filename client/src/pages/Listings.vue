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
        offset="3"
        w="6"
      >
        <vs-input
          primary
          state="primary"
          v-model="value1"
          class="listings-search-bar"
        >
          <template #icon>
            <i class="bx bx-search-alt"></i>
          </template>
        </vs-input>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        offset="3"
        w="6"
      >
        <listing-card />
        <div v-if="listings">
          <h2>some listings</h2>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ListingCard from "../components/ListingCard.vue";
export default {
  components: { ListingCard },
  name: "Listings",
  mounted() {
    this.setActivePage("Listings");
    this.getRecentListings();
  },
  computed: {
    ...mapState({
      listings: (state) => state.listings.listings,
    }),
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
    ...mapActions("listings", ["getRecentListings"]),
  },
};
</script>

<style>
.listings-search-bar > * > input,
label,
span {
  height: 70px;
  font-size: 30px;
}
</style>