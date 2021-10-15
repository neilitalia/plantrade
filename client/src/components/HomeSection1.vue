<template>
  <div class="home-section-2">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="text-center">Our platform makes it easy</h1>
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
  </div>
</template>

<script>
import Plant2 from "../assets/Plant2";
import Plant3 from "../assets/Plant3";
import Person3 from "../assets/Person3";
export default {
  name: "HomeSection1",
  components: { Plant2, Plant3, Person3 },
};
</script>

<style>
.home-section-2 {
  background-color: #edf1b3;
}
</style>