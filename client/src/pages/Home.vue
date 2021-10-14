<template>
  <div class="center grid">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="welcome">Welcome to plantrade!</h1>
      </vs-col>
    </vs-row>
    <vs-row justify="space-around">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <Plant1 :scale="0.5" />
        <Person2 :scale="0.5" />
        <Plant4 :scale="0.5" />
      </vs-col>
      <vs-col vs-type="flex" vs-align="center" w="3">
        <h2>Find the hottest deals on houseplants</h2>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Plant1 from "../assets/Plant1";
import Plant4 from "../assets/Plant4";
import Person2 from "../assets/Person2";
export default {
  components: {
    Plant1,
    Plant4,
    Person2,
  },
  name: "Home",
  mounted() {
    this.setActivePage("Home");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
.welcome {
  font-size: 3rem;
}
</style>