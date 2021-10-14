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
        w="8"
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
              :key="listing.id"
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
label {
  height: 70px;
  font-size: 30px;
}
</style>