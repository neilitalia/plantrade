<template>
  <div class="center grid">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="text-center">Your Profile</h1>
      </vs-col>
    </vs-row>
    <vs-row justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4">
        <UserDetails v-if="userDetails" />
      </vs-col>
    </vs-row>
    <!-- <vs-row class="mb-15vh" v-if="!userListings.length">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h3 class="text-center">No items yet...</h3>
      </vs-col>
    </vs-row> -->
    <vs-row class="mb-15vh">
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        offset="2"
        w="8"
      >
        <h2 class="text-center">Your Listings</h2>
        <div v-if="!userListings.length">
          <h2>Your {{ cart.name }} is lonely :( No items yet</h2>
        </div>
        <div v-else>
          <transition-group name="list" tag="vs-card-group">
            <div
              v-for="listing in userListings"
              :key="listing.id"
              class="list-item"
            >
              <ListingCard :listing="listing" />
            </div>
          </transition-group>
          <div class="subtotal-checkout">
            <vs-button border class="mr-20">
              <i class="bx bx-cart"></i>&nbsp;Checkout
            </vs-button>
            <vs-button border class="mr-20">
              <i class="bx bx-trash-alt"></i>&nbsp;Delete list
            </vs-button>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UserDetails from "../components/UserDetails";
export default {
  name: "Profile",
  components: { UserDetails },
  created() {
    this.getUserInfo();
    this.getListingsByUser();
  },
  mounted() {
    this.setActivePage("Profile");
  },
  computed: {
    ...mapState({
      userListings: (state) => state.profile.userListings,
      userDetails: (state) => state.profile.userDetails,
    }),
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
    ...mapActions("profile", ["getUserInfo", "getListingsByUser"]),
  },
};
</script>

<style>
</style>