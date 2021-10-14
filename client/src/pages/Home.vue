<template>
  <div class="center grid">
    <vs-row class="pt-15vh">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="welcome">Welcome to plantrade!</h1>
      </vs-col>
    </vs-row>
    <vs-row justify="center" class="pb-15vh">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <Plant1 :scale="0.9" />
        <Person2 :scale="0.7" />
        <Plant4 :scale="0.9" />
      </vs-col>
      <vs-col vs-type="flex" vs-align="center" w="3">
        <h2>Find the hottest deals on houseplants.</h2>
        <p>
          Plantrade is a new and growing online platform to buy and sell
          houseplants. See the hottest plants for sale without having to create
          an account.
        </p>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="welcome">Our platform makes it easy</h1>
      </vs-col>
    </vs-row>
    <vs-row justify="center" class="pb-15vh">
      <vs-col vs-type="flex" vs-align="center" w="3">
        <h2>No ads. No middlemen. No hidden fees.</h2>
        <p>
          Sign up for out website and post your own plants for sale. Buy plants
          from other users wherever in the United States. Search for plants by
          species or common name. Attract potential buyers by adding pretty
          pictures of your plant for sale.
        </p>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="space-around" vs-align="center" w="6">
        <Plant2 :scale="1" class="plant2" />
        <Person3 :scale="0.7" />
        <Plant3 :scale="1" />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="welcome">Security you can count on</h1>
      </vs-col>
    </vs-row>
    <vs-row justify="center" class="pb-15vh">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <Plant5 :scale="1" class="plant5" />
        <Person1 :scale="0.7" />
        <Plant6 :scale="1" class="plant6" />
      </vs-col>
      <vs-col vs-type="flex" vs-align="center" w="4">
        <h2>Shop and sell worry-free</h2>
        <p>
          Rest easy with a secure account and a secure payment system trusted by
          Google, Amazon, Zoom, and many others.
        </p>
      </vs-col>
    </vs-row>
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
h1.welcome {
  font-size: 3rem;
  text-align: center;
}
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