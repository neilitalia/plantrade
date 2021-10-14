<template>
  <div>
    <h1>Welcome to plantrade!</h1>
    <Plant1 />
    <Plant10 :scale="3" />
    <Plant2 />
    <Plant8 :scale="3" />
    <Plant3 />
    <Plant4 />
    <Plant5 />
    <Plant6 />
    <Plant9 :scale="2.5" />
    <Plant7 :scale="3" />
    <Person1 />
    <Person2 />
    <Person3 />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Plant1 from "../assets/Plant1";
import Plant2 from "../assets/Plant2";
import Plant3 from "../assets/Plant3";
import Plant4 from "../assets/Plant4";
import Plant5 from "../assets/Plant5";
import Plant6 from "../assets/Plant6";
import Plant7 from "../assets/Plant7";
import Plant8 from "../assets/Plant8";
import Plant9 from "../assets/Plant9";
import Plant10 from "../assets/Plant10";
import Person1 from "../assets/Person1";
import Person2 from "../assets/Person2";
import Person3 from "../assets/Person3";
export default {
  components: {
    Plant1,
    Plant2,
    Plant3,
    Plant4,
    Plant5,
    Plant6,
    Plant7,
    Plant8,
    Plant9,
    Plant10,
    Person1,
    Person2,
    Person3,
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
</style>