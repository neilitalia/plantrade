<template>
  <vs-button shadow class="image-upload-container" @click="getUploadUrl">
    <label for="image-upload" class="image-upload-label">
      <i class="bx bx-image-add"></i> Add an image
    </label>
    <input
      type="file"
      accept="image/*"
      id="image-upload"
      @change="handleFileChange"
      @blur="handleBlur"
    />
  </vs-button>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ImageUpload",
  data: () => ({
    imagePreview: null,
  }),
  computed: {
    ...mapState({
      imageFile: (state) => state.sell.imageFile,
      imageFileName: (state) => state.sell.imageFileName,
      imagePreview: (state) => state.sell.imagePreview,
    }),
  },
  methods: {
    ...mapActions("sell", [
      "setImageFile",
      "setImageFileName",
      "setImagePreview",
      "getUploadUrl",
    ]),
    handleFileChange(e) {
      const file = e.target.files;
      if (file && file[0]) {
        console.log("file :>> ", file);
        this.setImageFile(file[0]);
        this.setImageFileName(file[0].name);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file[0]);
      }
    },
    handleBlur() {
      console.log("blurred :>> ");
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}
.image-upload-container {
  width: 400px;
  height: 400px;
  display: flex;
  border-radius: 15px;
  background: #ffffff;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.image-upload-label {
  display: inline-block;
  padding: 200px 100px;
  cursor: pointer;
  font-size: 20px;
  color: #28164f;
}
</style>