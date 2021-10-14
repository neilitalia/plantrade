<template>
  <div class="center">
    <vs-navbar
      text-dark
      shadow
      shadowScroll
      :color="active"
      fixed
      center-collapsed
    >
      <template #left>
        <router-link to="/">
          <img src="../assets/logo.png" alt="plantrade logo" height="60px" />
        </router-link>
      </template>
      <template #right>
        <vs-navbar-item :active="activePage === 'Home'">
          <router-link to="/"> Home </router-link>
        </vs-navbar-item>
        <vs-navbar-item :active="activePage === 'Listings'">
          <router-link to="/listings"> Listings </router-link>
        </vs-navbar-item>
        <vs-navbar-item :active="activePage === 'Orders'" v-if="authenticated">
          <router-link to="/orders"> Orders </router-link>
        </vs-navbar-item>
        <vs-navbar-item
          :active="activePage === 'Checkout'"
          v-if="authenticated"
        >
          <router-link to="/checkout"> Checkout </router-link>
        </vs-navbar-item>
        <vs-navbar-item :active="activePage === 'Profile'" v-if="authenticated">
          <router-link to="/profile"> Profile </router-link>
        </vs-navbar-item>
        <vs-navbar-item v-if="!authenticated">
          <router-link :to="{ path: '/', hash: '#register' }">
            Get Started
          </router-link>
          <!-- <a href="#register"> Get Started </a> -->
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
  // TODO: Fix visual bug, navbar doesnt update on logout
  // watch: {
  //   authenticated() {
  //     this.$forceUpdate();
  //   },
  // },
  methods: {
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