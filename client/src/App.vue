<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar,
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
.mb-15 {
  margin-bottom: 15px;
}
.w-100--1c:first-child {
  width: 100%;
}
</style>
