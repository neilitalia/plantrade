<template>
  <div class="center grid">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
        <h1 class="text-center">Sell with us</h1>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        offset="2"
        w="8"
      >
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="7">
            <input type="file" accept="image/*" @change="handleFileChange" />
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
            <h1>form</h1>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Sell",
  mounted() {
    this.setActivePage("Sell");
  },
  methods: {
    ...mapActions("navigation", ["setActivePage"]),
    handleFileChange(e) {
      const file = e.target.files;
      if (file && file[0]) {
        console.log("file :>> ", file);
        this.file = file[0];
        this.fileName = file[0].name;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.filePreview = e.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },
  },
};
</script>

<style>
</style>