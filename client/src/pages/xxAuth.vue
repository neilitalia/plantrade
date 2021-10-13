<template>
  <div>
    <vs-row>
      <vs-col
        :key="index"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        w="6"
      >
        <Login />
      </vs-col>
      <vs-col
        :key="index"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        w="6"
      >
        <Signup />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import Login from "../components/Login";
import Signup from "../components/Signup";
export default {
  name: "Auth",
  components: {
    Login,
    Signup,
  },
  mounted() {
    this.$store.dispatch("setActivePage", "Auth");
  },
};
</script>

<style>
</style>