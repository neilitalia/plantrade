<template>
  <vs-dialog blur auto-width v-model="openAuthDialog">
    <template #header>
      <div>
        <h4 class="not-margin">Sign in to plantrade</h4>
      </div>
    </template>
    <div class="con-form">
      <vs-input
        dark
        state="dark"
        v-model="username"
        @change="setUsername"
        placeholder="Username"
        class="mb-15"
      >
        <template #icon> @ </template>
      </vs-input>
      <vs-input
        dark
        state="dark"
        type="password"
        v-model="password"
        @change="setPassword"
        placeholder="Password"
        class="mb-15"
        v-on:keyup.enter="handleLogin"
      >
        <template #icon>
          <i class="bx bxs-lock" />
        </template>
      </vs-input>
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block @click="handleLogin"> Sign In </vs-button>
        <div class="new">
          New Here?
          <span class="new-account-link" @click="routeToRegistration"
            >Create New Account</span
          >
        </div>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AuthDialog",
  computed: {
    ...mapState({
      username: (state) => state.auth.username,
      password: (state) => state.auth.password,
      showPassword: (state) => state.auth.showPassword,
    }),
    openAuthDialog: {
      get() {
        return this.$store.state.auth.openAuthDialog;
      },
      set() {
        this.$store.commit("auth/toggleAuthDialog");
      },
    },
  },
  methods: {
    ...mapActions("auth", [
      "setUsername",
      "setPassword",
      "toggleShowPassword",
      "toggleAuthDialog",
      "handleLogin",
      "setLoginStatus",
    ]),
    routeToRegistration() {
      this.$router.push({ name: "Home", hash: "#register" });
      this.toggleAuthDialog();
    },
  },
};
</script>

<style scoped>
.vs-input-content {
  width: 100%;
}
.new-account-link {
  text-decoration: underline;
  cursor: pointer;
  color: #5b3cc4;
}
</style>