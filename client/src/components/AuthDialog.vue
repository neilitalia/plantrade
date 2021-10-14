<template>
  <vs-dialog blur auto-width v-model="$store.state.auth.openAuthDialog">
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
      >
        <template #icon>
          <i class="bx bxs-lock" />
        </template>
      </vs-input>
      <div class="flex">
        <vs-checkbox v-model="remember">Remember me</vs-checkbox>
        <a href="#">Forgot Password?</a>
      </div>
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block @click="handleLogin"> Sign In </vs-button>
        <div class="new">New Here? <a href="#">Create New Account</a></div>
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
      loginStatus: (state) => state.auth.loginStatus,
    }),
    openAuthDialog: {
      get() {
        return this.$store.state.auth.openAuthDialog;
      },
      set() {
        this.$store.commit("toggleAuthDialog");
      },
    },
  },
  watch: {
    loginStatus() {
      if (this.loginStatus === "Success") {
        this.$vs.notification({
          progress: "auto",
          color: "#97BC66",
          position: "bottom-center",
          title: "Login Success!",
          text: "Happy browsing  :)",
        });
      } else if (this.loginStatus === "Failed") {
        this.$vs.notification({
          progress: "auto",
          position: "bottom-center",
          title: "Oops!",
          text: "Invalid login, try again.",
        });
      }
    },
  },
  methods: {
    ...mapActions("auth", [
      "setUsername",
      "setPassword",
      "toggleShowPassword",
      "toggleAuthDialog",
      "handleLogin",
    ]),
    openNotification() {
      this.$vs.notification({
        title: "Oops! Something went wrong.",
        text: `These documents refer to the latest version of vuesax (4.0+),
        to see the documents of the previous versions you can do it here 👉 Vuesax3.x`,
      });
    },
  },
};
</script>

<style scoped>
.vs-input-content {
  width: 100%;
}
</style>