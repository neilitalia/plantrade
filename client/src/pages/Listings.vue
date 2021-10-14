<template>
  <div class="center grid">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="text-center">Search through our listings</h1>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        offset="3"
        w="6"
      >
        <vs-input
          primary
          state="primary"
          v-model="value1"
          class="listings-search-bar"
        >
          <template #icon>
            <i class="bx bx-search-alt"></i>
          </template>
        </vs-input>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Listings",
  mounted() {
    this.setActivePage("Listings");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
  },
};
</script>

<style>
.listings-search-bar > * > input,
label,
span {
  height: 70px;
  font-size: 30px;
}
</style>