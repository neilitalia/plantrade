<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <main>
      <router-view></router-view>
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
  computed: {
    ...mapState({
      authenticated: (state) => state.auth.authenticated,
    }),
  },
  methods: {
    ...mapActions("auth", ["checkSession"]),
  },
  mounted() {
    this.checkSession();
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
.pb-15vh {
  padding-bottom: 15vh;
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
</style>
