<template>
  <div class="center grid">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="text-center">Your Profile</h1>
      </vs-col>
    </vs-row>
    <vs-row v-if="!userListings.length">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h3 class="text-center">No items yet...</h3>
      </vs-col>
    </vs-row>
    <vs-row justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
        <UserDetails />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
        <h3 class="text-center">No items yet...</h3>
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