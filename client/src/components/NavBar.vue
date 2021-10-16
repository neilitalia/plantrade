<template>
  <div class="center">
    <vs-navbar shadow shadowScroll fixed center-collapsed>
      <template #left>
        <vs-navbar-item to="/">
          <img src="../assets/logo.png" alt="plantrade logo" height="40px" />
        </vs-navbar-item>
      </template>
      <template #right>
        <vs-navbar-item to="/" :active="activePage === 'Home'">
          Home
        </vs-navbar-item>
        <vs-navbar-item to="/listings" :active="activePage === 'Listings'">
          Listings
        </vs-navbar-item>
        <vs-navbar-item
          to="/cart"
          :active="activePage === 'Cart'"
          v-if="authenticated"
        >
          Cart
        </vs-navbar-item>
        <vs-navbar-item
          to="/checkout"
          :active="activePage === 'Checkout'"
          v-if="authenticated"
        >
          Checkout
        </vs-navbar-item>
        <vs-navbar-item
          to="/profile"
          :active="activePage === 'Profile'"
          v-if="authenticated"
        >
          Profile
        </vs-navbar-item>
        <vs-navbar-item
          :to="{ path: '/', hash: '#register' }"
          v-if="!authenticated"
        >
          Get Started
        </vs-navbar-item>
        <vs-navbar-item v-if="!authenticated">
          <vs-button @click="toggleAuthDialog"> Log in </vs-button>
        </vs-navbar-item>
        <vs-navbar-item v-if="authenticated">
          <vs-button transparent @click="handleLogOut"> Log out </vs-button>
        </vs-navbar-item>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "NavBar",
  components: {},
  computed: {
    ...mapState({
      activePage: (state) => state.navigation.activePage,
      openAuthDialog: (state) => state.auth.openAuthDialog,
      user: (state) => state.auth.user,
      authenticated: (state) => state.auth.authenticated,
    }),
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
    ...mapActions("auth", ["toggleAuthDialog", "handleLogOut"]),
  },
};
</script>

<style scoped>
img {
  margin-top: 10px;
}
a {
  text-decoration: none;
}
</style>