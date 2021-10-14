<template>
  <div>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="text-center">Security you can count on</h1>
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
import Plant5 from "../assets/Plant5";
import Plant6 from "../assets/Plant6";
import Person1 from "../assets/Person1";
export default {
  name: "HomeSection2",
  components: {
    Plant5,
    Plant6,
    Person1,
  },
};
</script>

<style>
</style>