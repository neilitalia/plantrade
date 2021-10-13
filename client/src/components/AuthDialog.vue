<template>
  <vs-dialog blur auto-width not-close v-model="openAuthDialog">
    <template #header>
      <h4 class="not-margin">Sign in to plantrade</h4>
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
// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapActions } = createNamespacedHelpers("auth");
import { mapState, mapActions } from "vuex";
import { Login } from "../services/AuthServices";

export default {
  name: "AuthDialog",
  computed: {
    ...mapState({
      username: (state) => state.auth.username,
      password: (state) => state.auth.password,
      showPassword: (state) => state.auth.showPassword,
      openAuthDialog: (state) => state.auth.openAuthDialog,
    }),
  },
  methods: {
    ...mapActions("auth", [
      "setUsername",
      "setPassword",
      "toggleShowPassword",
      "toggleAuthDialog",
    ]),
    async handleLogin() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      const res = await Login(payload);
      if (res.status === 200) {
        this.$store.dispatch("setUser", res.data.user);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);
      } else {
        this.openNotification();
      }
    },
    openNotification() {
      this.$vs.notification({
        title: "Oops! Something went wrong.",
        text: `These documents refer to the latest version of vuesax (4.0+),
        to see the documents of the previous versions you can do it here 👉 Vuesax3.x`,
      });
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