<template>
  <vs-dialog blur auto-width not-close v-model="$store.state.openAuthDialog">
    <template #header>
      <h4 class="not-margin">Log in to plantrade</h4>
    </template>
    <div class="con-form">
      <vs-input v-model="username" placeholder="Username" class="mb-15">
        <template #icon> @ </template>
      </vs-input>
      <vs-input
        type="password"
        v-model="password"
        placeholder="Password"
        class="mb-15"
      >
        <template #icon>
          <i class="bx bxs-lock" />
        </template>
      </vs-input>
      <div class="flex">
        <!-- <vs-checkbox v-model="remember">Remember me</vs-checkbox> -->
        <a href="#">Forgot Password?</a>
      </div>
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block> Sign In </vs-button>

        <div class="new">New Here? <a href="#">Create New Account</a></div>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapActions } = createNamespacedHelpers("auth");

export default {
  name: "AuthDialog",
  computed: {
    password: {
      get() {
        return this.$store.state.password;
      },
      set(value) {
        this.$store.commit("setPassword", value);
      },
    },
    username: {
      get() {
        return this.$store.state.username;
      },
      set(value) {
        this.$store.commit("setUsername", value);
      },
    },
    openAuthDialog: {
      get() {
        return this.$state.openAuthDialog;
      },
      set() {
        this.$store.commit("toggleAuthDialog");
      },
    },
  },
  // computed: {
  //   ...mapState({
  //     auth: state => state.auth,
  //     navigation: state => state.navigation
  //   }),
  // },
  // methods: {
  //   ...mapActions(["auth"]),
  // },
};
</script>

<style scoped>
.vs-input-content {
  width: 100%;
}
</style>