<template>
  <div>
    <h2>Tell us about your listing</h2>
    <vs-input
      state="dark"
      v-model="title"
      label-placeholder="Listing Title"
      class="mb-25 listing-title"
      maxlength="40"
    />
    <vs-input
      state="dark"
      type="number"
      :value="price"
      @change="validatePrice"
      @blur="validatePrice"
      label-placeholder="$ Price"
      class="mb-25"
    />
    <vs-input
      state="dark"
      type="number"
      :value="quantity"
      @change="validateQuantity"
      @blur="validateQuantity"
      label-placeholder="Quantity"
      class="mb-25"
    />
    <vs-input
      state="dark"
      v-model="plant"
      label-placeholder="Plant"
      class="mb-25"
      maxlength="40"
    />
    <vs-input
      state="dark"
      type="text"
      v-model="description"
      label-placeholder="Description"
      class="mb-25"
      maxlength="100"
    />
    <vs-button
      flat
      active
      @click="handleSubmit"
      :disabled="!title || !price || !quantity || !description || !plant"
    >
      Sell this plant
    </vs-button>
  </div>
</template>

<script>
export default {
  name: "SellForm",
  methods: {
    handleSubmit() {},
    validateQuantity(e) {
      this.quantity = parseInt(e.target.value);
    },
    validatePrice(e) {
      this.price = parseFloat(e.target.value).toFixed(2);
    },
  },
  computed: {
    title: {
      get() {
        return this.$store.state.sell.title;
      },
      set(value) {
        this.$store.commit("sell/setTitle", value);
      },
    },
    price: {
      get() {
        return this.$store.state.sell.price;
      },
      set(value) {
        this.$store.commit("sell/setPrice", value);
      },
    },
    plant: {
      get() {
        return this.$store.state.sell.plant;
      },
      set(value) {
        this.$store.commit("sell/setPlant", value);
      },
    },
    description: {
      get() {
        return this.$store.state.sell.description;
      },
      set(value) {
        this.$store.commit("sell/setDescription", value);
      },
    },
    quantity: {
      get() {
        return this.$store.state.sell.quantity;
      },
      set(value) {
        const rounded = parseInt(value);
        this.$store.commit("sell/setQuantity", rounded);
      },
    },
  },
};
</script>

<style>
div.listing-title > div > input {
  font-weight: 700;
}
</style>