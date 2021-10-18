<template>
  <vs-dialog
    not-padding
    scroll
    overflow-hidden
    @close="handleClose"
    v-model="openEditDialog"
    class="center grid"
  >
    <vs-row vs-justify="space-between" v-if="apiResponse">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <div class="con-image">
          <img
            v-if="!apiResponse.image_listing.length"
            :src="placeholder"
            alt="Plant placeholder image"
          />
          <img
            v-else
            :src="awsBaseUrl + apiResponse.image_listing[0].file_name"
            alt="Plant photo"
          />
        </div>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
        <vs-row justify="center" align="center">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="10">
            <h2 class="mb-25">Edit your listing</h2>
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
              label-placeholder="Plant Species"
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
              @click="submitEditedListing"
              :disabled="
                !title || !price || !quantity || !description || !plant
              "
            >
              Update Listing
            </vs-button>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </vs-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { AWS_BASE_URL, IMAGE_PLACEHOLDER_URL } from "../globals";
export default {
  name: "EditListingDialog",
  data: () => ({
    awsBaseUrl: AWS_BASE_URL,
    placeholder: IMAGE_PLACEHOLDER_URL,
  }),
  methods: {
    ...mapActions("editListing", ["submitEditedListing", "resetEditForm"]),
    handleClose() {
      this.resetEditForm();
    },
    validateQuantity(e) {
      if (e.target.value >= 0) {
        this.quantity = parseInt(e.target.value);
      } else {
        this.quantity = 0;
      }
    },
    validatePrice(e) {
      this.price = parseFloat(e.target.value).toFixed(2);
    },
  },
  computed: {
    ...mapState({
      apiResponse: (state) => state.editListing.apiResponse,
    }),
    openEditDialog: {
      get() {
        return this.$store.state.editListing.openEditDialog;
      },
      set() {
        this.$store.commit("editListing/toggleEditDialog");
      },
    },
    title: {
      get() {
        return this.$store.state.editListing.title;
      },
      set(value) {
        this.$store.commit("editListing/setTitle", value);
      },
    },
    price: {
      get() {
        return this.$store.state.editListing.price;
      },
      set(value) {
        const price = parseFloat(value).toFixed(2);
        this.$store.commit("editListing/setPrice", price);
      },
    },
    quantity: {
      get() {
        return this.$store.state.editListing.quantity;
      },
      set(value) {
        if (value >= 0) {
          const rounded = parseInt(value);
          this.$store.commit("editListing/setQuantity", rounded);
        } else {
          this.$store.commit("editListing/setQuantity", 0);
        }
      },
    },
    plant: {
      get() {
        return this.$store.state.editListing.plant;
      },
      set(value) {
        this.$store.commit("editListing/setPlant", value);
      },
    },
    description: {
      get() {
        return this.$store.state.editListing.description;
      },
      set(value) {
        this.$store.commit("editListing/setDescription", value);
      },
    },
  },
};
</script>

<style>
</style>