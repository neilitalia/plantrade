<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <main>
      <transition name="fade">
        <router-view class="view" />
      </transition>
    </main>
    <AuthDialog v-if="!authenticated" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AuthDialog from "./components/AuthDialog.vue";
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
    AuthDialog,
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.checkSession().then(() => {
        if (this.authenticated) {
          this.getUserCartItems();
          this.getUserCartsList();
          this.getUserInfo();
          this.getListingsByUser();
        }
      });
    }
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.auth.loginStatus,
      cartStatus: (state) => state.cart.cartStatus,
      authenticated: (state) => state.auth.authenticated,
      listingStatus: (state) => state.sell.listingStatus,
      user: (state) => state.auth.user,
    }),
  },
  watch: {
    loginStatus() {
      if (this.loginStatus === "Success") {
        this.getUserCartItems();
        this.getUserCartsList();
        this.$vs.notification({
          progress: "auto",
          color: "#B5E27A",
          position: "bottom-center",
          title: `Hey there ${this.user.username}!`,
          text: "Login success. Happy browsing :)",
          onDestroy: () => {
            this.setLoginStatus(null);
          },
        });
      } else if (this.loginStatus === "Logged Back In") {
        this.$vs.notification({
          progress: "auto",
          color: "#B5E27A",
          position: "bottom-center",
          title: `Welcome back ${this.user.username}!`,
          text: "Nice to see you again :)",
          onDestroy: () => {
            this.setLoginStatus(null);
          },
        });
      } else if (this.loginStatus === "Logged Out") {
        this.$router.push("/");
        this.$vs.notification({
          progress: "auto",
          color: "#B5E27A",
          position: "bottom-center",
          title: "See you later!",
          onDestroy: () => {
            this.setLoginStatus(null);
          },
        });
      } else if (this.loginStatus === "Failed") {
        this.$vs.notification({
          progress: "auto",
          position: "bottom-center",
          title: "Oops!",
          text: "Invalid login, try again.",
          onDestroy: () => {
            this.setLoginStatus(null);
          },
        });
      }
    },
    cartStatus() {
      if (this.cartStatus === "Added") {
        this.$vs.notification({
          progress: "auto",
          color: "#B5E27A",
          position: "bottom-center",
          title: "Item added to cart!",
          onDestroy: () => {
            this.setCartStatus(null);
          },
        });
      } else if (this.cartStatus === "Removed") {
        this.$vs.notification({
          progress: "auto",
          color: "#B5E27A",
          position: "bottom-center",
          title: "We took it off your cart.",
          onDestroy: () => {
            this.setCartStatus(null);
          },
        });
      } else if (this.cartStatus === "Failed") {
        this.$vs.notification({
          progress: "auto",
          position: "bottom-center",
          title: "Oops!",
          text: "Something went wrong, try again.",
          onDestroy: () => {
            this.setCartStatus(null);
          },
        });
      }
    },
    listingStatus() {
      if (this.listingStatus === "Submitted with image") {
        this.$router.push("/listings");
        this.$vs.notification({
          progress: "auto",
          color: "#B5E27A",
          position: "bottom-center",
          title: "We got your listing!",
          text: "Thanks for adding a pretty picture.",
          onDestroy: () => {
            this.setListingStatus(null);
          },
        });
      } else if (this.listingStatus === "Submitted") {
        this.$router.push("/listings");
        this.$vs.notification({
          progress: "auto",
          color: "#B5E27A",
          position: "bottom-center",
          title: "We got your listing!",
          onDestroy: () => {
            this.setListingStatus(null);
          },
        });
      } else if (this.listingStatus === "Failed") {
        this.$vs.notification({
          progress: "auto",
          position: "bottom-center",
          title: "Oops!",
          text: "Something went wrong, try again.",
          onDestroy: () => {
            this.setListingStatus(null);
          },
        });
      }
    },
  },
  methods: {
    ...mapActions("auth", ["checkSession"]),
    ...mapActions("sell", ["setListingStatus"]),
    ...mapActions("profile", ["getUserInfo", "getListingsByUser"]),
    ...mapActions("cart", [
      "getUserCartItems",
      "getUserCartsList",
      "setCartStatus",
    ]),
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 80px;
  background-color: #f6ddd4;
  min-height: 100vh;
}
button,
input,
h1,
h2,
h3,
h4,
h5,
h6,
a,
p {
  font-family: "Poppins", sans-serif;
  color: #28164f;
}
h1 {
  font-size: 3.3em;
}
.mb-15 {
  margin-bottom: 15px;
}
.mb-25 {
  margin-bottom: 25px;
}
.plr-12 {
  padding-left: 12px;
  padding-right: 12px;
}
.mr-10vw {
  margin-right: 10vw;
}
.mr-20 {
  margin-right: 20px;
}
.pb-15vh {
  padding-bottom: 15vh;
}
.mb-15vh {
  margin-bottom: 15vh;
}
.pt-15vh {
  padding-top: 15vh;
}
.w-100 {
  width: 100%;
}
.vs-input {
  width: 100%;
}
.ul {
  text-decoration: underline;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.view {
  position: absolute;
  width: 100%;
  left: 0;
  transition: all 0.3s ease;
}
.list-enter-active,
.list-leave-active {
  position: absolute;
  transition: all 0.5s;
  z-index: -10;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-item {
  transition: all 0.5s;
  display: inline-block;
}
.no-pointer {
  pointer-events: none;
}
div.vs-card {
  box-shadow: 0px 8px 20px #1f1d1e23;
}
button.vs-button:disabled {
  opacity: 0.5;
}
button.vs-navbar__item {
  color: #28164f;
}
div.vs-navbar__line {
  color: #28164f;
}
</style>
