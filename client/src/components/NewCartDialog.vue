<template>
  <vs-dialog auto-width not-center v-model="openNewCartDialog">
    <template #header>
      <h4 class="not-margin">
        <i class="bx bx-list-plus"></i> What do you want to name you new list?
      </h4>
    </template>
    <div class="con-content">
      <vs-input v-model="newCartName" placeholder="Name"></vs-input>
    </div>
    <template #footer>
      <div class="con-footer">
        <vs-button transparent @click="createNewCart"> Ok </vs-button>
        <vs-button dark transparent @click="toggleNewCartDialog">
          Cancel
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "NewCartDialog",
  computed: {
    ...mapState({
      cartStatus: (state) => state.cart.cartStatus,
    }),
    openNewCartDialog: {
      get() {
        return this.$store.state.cart.openNewCartDialog;
      },
      set() {
        this.$store.commit("cart/toggleNewCartDialog");
      },
    },
    newCartName: {
      get() {
        return this.$store.state.cart.newCartName;
      },
      set(value) {
        this.$store.commit("cart/setNewCartName", value);
      },
    },
  },
  methods: {
    ...mapActions("cart", ["toggleNewCartDialog", "createNewCart"]),
  },
};
</script>

<style>
</style>