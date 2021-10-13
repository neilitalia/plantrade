<template>
  <div class="center">
    <vs-navbar text-dark :color="active" center-collapsed v-model="active">
      <template #left>
        <img src="../assets/logo.png" alt="plantrade logo" height="60px" />
      </template>
      <template #right>
        <vs-navbar-item
          :active="$store.state.activePage === 'Home'"
          id="primary"
        >
          <router-link to="/"> Home </router-link>
        </vs-navbar-item>
        <vs-navbar-item
          :active="$store.state.activePage === 'Auth'"
          id="primary"
        >
          <router-link to="/signup"> Sign Up </router-link>
        </vs-navbar-item>
        <vs-navbar-item :active="$store.state.activePage === 'Listings'">
          <router-link to="/listings"> Listings </router-link>
        </vs-navbar-item>
        <vs-navbar-item :active="$store.state.activePage === 'Orders'">
          <router-link to="/orders"> Orders </router-link>
        </vs-navbar-item>
        <vs-navbar-item :active="$store.state.activePage === 'Checkout'">
          <router-link to="/checkout"> Checkout </router-link>
        </vs-navbar-item>
        <vs-navbar-item :active="$store.state.activePage === 'Profile'">
          <router-link to="/profile"> Profile </router-link>
        </vs-navbar-item>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
};
</script>

<style scoped>
img {
  margin-top: 10px;
}
</style>