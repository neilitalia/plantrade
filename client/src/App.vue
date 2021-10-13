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
}
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 80px;
  background-color: #f6ddd4;
  min-height: 100vh;
}
button,
input {
  font-family: "Poppins", sans-serif;
}
h1 {
  color: #28164f;
}
a {
  color: #28164f;
}
.mb-15 {
  margin-bottom: 15px;
}
.w-100 {
  width: 100%;
}
.vs-input {
  width: 100%;
}
</style>
