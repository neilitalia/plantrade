<template>
  <div class="center grid">
    <WelcomeHeader />
    <HomeSection1 />
    <HomeSection2 />
    <HomeSection3 />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import WelcomeHeader from "../components/WelcomeHeader.vue";
import HomeSection1 from "../components/HomeSection1.vue";
import HomeSection2 from "../components/HomeSection2.vue";
import HomeSection3 from "../components/HomeSection3.vue";
export default {
  name: "Home",
  components: {
    WelcomeHeader,
    HomeSection1,
    HomeSection2,
    HomeSection3,
  },
  mounted() {
    this.setActivePage("Home");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
.plant2 {
  transform: translateX(50px);
}
.plant5 {
  transform: translateX(30px);
}
.plant6 {
  transform: translateX(-50px);
}
</style>