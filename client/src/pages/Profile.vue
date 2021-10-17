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
          <h2>No items yet...</h2>
        </div>
        <div v-else>
          <transition-group name="list" tag="vs-card-group">
            <div
              v-for="listing in userListings"
              :key="listing.id"
              class="list-item"
            >
              <ListingCard :listing="listing" :inProfile="true" />
            </div>
          </transition-group>
        </div>
      </vs-col>
    </vs-row>
    <DeleteListingDialog />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ListingCard from "../components/ListingCard";
import UserDetails from "../components/UserDetails";
import DeleteListingDialog from "../components/DeleteListingDialog";
export default {
  name: "Profile",
  components: { UserDetails, ListingCard, DeleteListingDialog },
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