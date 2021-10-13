<template>
  <div class="center">
    <vs-button @click="active = !active"> Open Dialog </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Welcome to <b>Vuesax</b></h4>
      </template>

      <div class="con-form">
        <vs-input
          v-model="email"
          placeholder="Email"
          dark
          state="dark"
          class="mb-15 w-100--1c"
        >
          <template #icon> @ </template>
        </vs-input>
        <vs-input
          type="password"
          v-model="password"
          placeholder="Password"
          dark
          state="dark"
        >
          <template #icon>
            <i class="bx bxs-lock"></i>
          </template>
        </vs-input>
        <div class="flex">
          <vs-checkbox v-model="remember">Remember me</vs-checkbox>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LoginModal",
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
  },
};
</script>

<style>
</style>