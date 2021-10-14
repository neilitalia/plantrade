<template>
  <div>
    <vs-row class="pt-15vh">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="text-center">Welcome to plantrade!</h1>
      </vs-col>
    </vs-row>
    <vs-row justify="center" class="pb-15vh">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <Plant1 :scale="0.9" />
        <Person2 :scale="0.7" />
        <Plant4 :scale="0.9" />
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
        <h2>Find the hottest deals on houseplants.</h2>
        <p>
          Plantrade is a new and growing online platform to buy and sell
          houseplants. See the hottest plants for sale without having to create
          an account.
        </p>
        <div class="center content-inputs">
          <vs-input
            label="Search"
            v-model="value"
            placeholder="Look for plants"
          />
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import Plant1 from "../assets/Plant1";
import Plant4 from "../assets/Plant4";
import Person2 from "../assets/Person2";
export default {
  name: "WelcomeHeader",
  components: { Plant1, Plant4, Person2 },
};
</script>

<style>
</style>