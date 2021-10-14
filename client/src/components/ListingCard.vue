<template>
  <vs-card class="mb-25 plr-12">
    <template #title>
      <h3>{{ listing.title }}</h3>
    </template>
    <template #img>
      <img
        src="https://www.thespruce.com/thmb/HtNVl5_9nAJpPYiN2a8579nDgZk=/1545x1545/smart/filters:no_upscale()/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg"
        alt=""
      />
    </template>
    <template #text>
      <p>{{ listing.description }}</p>
    </template>
    <template #interactions>
      <vs-button danger icon>
        <i class="bx bx-heart"></i>
      </vs-button>
      <vs-button class="btn-chat" shadow primary>
        <i class="bx bx-show"></i>
        <span class="span">&nbsp; {{ listing.views }}</span>
      </vs-button>
    </template>
  </vs-card>
</template>

<script>
export default {
  name: "ListingCard",
  props: ["listing"],
};
</script>

<style>
</style>