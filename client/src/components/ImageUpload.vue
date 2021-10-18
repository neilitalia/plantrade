<template>
  <div>
    <vs-button
      shadow
      class="image-upload-container"
      @click="getUploadUrl"
      :style="{
        backgroundImage: 'url(' + imagePreview + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <label for="image-upload" class="image-upload-label" v-if="!imageFile">
        <i class="bx bx-image-add"></i> Add an image
      </label>
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        @change="handleFileChange"
      />
    </vs-button>
    <div v-if="localFileName" class="image-info">
      <vs-button icon border @click="resetFileUpload">
        <i class="bx bx-trash"></i>
      </vs-button>
      <p>{{ formattedLocalFileName() }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ImageUpload",
  computed: {
    ...mapState({
      imageFile: (state) => state.sell.imageFile,
      localFileName: (state) => state.sell.localFileName,
      imagePreview: (state) => state.sell.imagePreview,
    }),
  },
  methods: {
    ...mapActions("sell", [
      "setImageFile",
      "setLocalFileName",
      "setImagePreview",
      "getUploadUrl",
      "resetFileUpload",
      "uploadToBucket",
    ]),
    handleFileChange(e) {
      const file = e.target.files;
      if (file && file[0]) {
        this.setImageFile(file[0]);
        this.setLocalFileName(file[0].name);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file[0]);
        this.uploadToBucket();
      }
    },
    formattedLocalFileName() {
      let extension = this.localFileName.split(".").at(-1);
      let name = this.localFileName.split("").slice(0, 8).join("");
      return `${name}...${extension}`;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image-upload-label {
  padding: 170px 100px;
  cursor: pointer;
  font-size: 20px;
  color: #28164f;
}
.image-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>