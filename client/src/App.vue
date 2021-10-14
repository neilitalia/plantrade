<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <main>
      <router-view></router-view>
    </main>
    <AuthDialog />
  </div>
</template>

<script>
import AuthDialog from "./components/AuthDialog";
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
    AuthDialog,
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
.mb-15 {
  margin-bottom: 15px;
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
</style>
