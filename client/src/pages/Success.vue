<template>
  <div>
    <h1 class="text-center">Thanks for your support!</h1>
    <h3 class="text-center">
      Your purchase helps our platform and community grow.
    </h3>
    <div class="success-page-content">
      <Plant6 :scale="1.2" />
      <Person1 :scale="0.9" />
      <Plant9 :scale="2" />
      <Plant2 :scale="1.3" />
      <Person3 :scale="0.8" />
      <Plant1 :scale="1" />
    </div>
  </div>
</template>

<script>
import Person1 from "../assets/Person1";
import Person3 from "../assets/Person3";
import Plant9 from "../assets/Plant9";
import Plant6 from "../assets/Plant6";
import Plant1 from "../assets/Plant1";
import Plant2 from "../assets/Plant2";
export default {
  name: "Success",
  components: { Person1, Person3, Plant9, Plant6, Plant1, Plant2 },
};
</script>

<style>
.success-page-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}
.plant-5 {
  transform: translateX(-50px);
}
</style>