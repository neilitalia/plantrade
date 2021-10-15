<template>
  <div id="register">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="text-center">Get started today</h1>
      </vs-col>
    </vs-row>
    <vs-row justify="center" class="pb-15vh">
      <vs-col vs-type="flex" vs-align="center" w="3" class="mr-10vw">
        <h2>Sign up for an account</h2>
        <vs-input
          dark
          state="dark"
          v-model="username"
          @change="setUsername"
          label-placeholder="Username"
          class="mb-25"
        />
        <vs-input
          dark
          state="dark"
          type="email"
          v-model="email"
          @change="setEmail"
          @blur="validateEmail"
          label-placeholder="Email"
          class="mb-25"
        >
          <template v-if="!validEmail && email !== ''" #message-danger>
            Email Invalid
          </template>
        </vs-input>
        <vs-input
          dark
          state="dark"
          v-model="mobile"
          @change="setMobile"
          @blur="validateMobile"
          label-placeholder="Mobile Number"
          class="mb-25"
        >
          <template v-if="!validMobile && mobile !== ''" #message-danger>
            Mobile Number Invalid
          </template>
        </vs-input>
        <vs-input
          dark
          state="dark"
          type="password"
          v-model="password"
          @change="setPassword"
          @blur="validatePassword"
          label-placeholder="Password"
          class="mb-25"
        />
        <vs-input
          dark
          state="dark"
          type="password"
          v-model="confirmPassword"
          @change="setConfirmPassword"
          @blur="validatePassword"
          label-placeholder="Confirm Password"
          class="mb-25"
        >
          <template
            v-if="!validPassword && confirmPassword !== ''"
            #message-danger
          >
            Passwords Invalid
          </template>
        </vs-input>
        <vs-button
          flat
          active
          @click="handleRegister"
          :disabled="!validateEmail || !validMobile || !validPassword"
        >
          Register
        </vs-button>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="space-around" vs-align="center" w="4">
        <Plant10 :scale="2.5" />
        <Plant7 :scale="2" />
        <Plant8 :scale="2" />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import Plant10 from "../assets/Plant10";
import Plant7 from "../assets/Plant7";
import Plant8 from "../assets/Plant8";
import { mapState, mapActions } from "vuex";
export default {
  name: "HomeSection3",
  components: {
    Plant10,
    Plant7,
    Plant8,
  },
  data: () => ({
    validEmail: null,
    validMobile: null,
    validPassword: null,
  }),
  computed: {
    ...mapState({
      username: (state) => state.registration.username,
      email: (state) => state.registration.email,
      mobile: (state) => state.registration.mobile,
      password: (state) => state.registration.password,
      confirmPassword: (state) => state.registration.confirmPassword,
      latitude: (state) => state.registration.latitude,
      longitude: (state) => state.registration.longitude,
      registerStatus: (state) => state.registration.registerStatus,
    }),
  },
  watch: {
    registerStatus() {
      if (this.registerStatus === "Success") {
        this.$vs.notification({
          progress: "auto",
          color: "#97BC66",
          position: "bottom-center",
          title: "Registration Success!",
          text: "We successfully created your account. You can try logging in now.",
          onDestroy: () => {
            this.setRegisterStatus(null);
          },
        });
      } else if (this.registerStatus === "Failed") {
        this.$vs.notification({
          progress: "auto",
          position: "bottom-center",
          title: "Oops!",
          text: "Something went wrong. Try again in a few minutes.",
          onDestroy: () => {
            this.setRegisterStatus(null);
          },
        });
      }
    },
  },
  methods: {
    ...mapActions("registration", [
      "setUsername",
      "setEmail",
      "setMobile",
      "setPassword",
      "setConfirmPassword",
      "setLatitude",
      "setLongitude",
      "handleRegister",
      "setRegisterStatus",
    ]),
    validateEmail(e) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.validEmail = regex.test(String(e.target.value).toLowerCase());
    },
    validateMobile(e) {
      const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      this.validMobile = regex.test(String(e.target.value));
    },
    validatePassword() {
      if (this.password.length > 6 && this.password === this.confirmPassword) {
        this.validPassword = true;
      } else {
        this.validPassword = false;
      }
    },
  },
};
</script>

<style>
</style>