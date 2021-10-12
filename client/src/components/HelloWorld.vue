<template>
  <div class="hello">
    <img
      src="https://plantrade.s3.us-east-2.amazonaws.com/b106aa11e1f8e5223c48c79b12147fef"
      alt="asdadf"
    />
    <h1>Hello</h1>
    <input type="file" accept="image/*" @change="handleFileChange" />
    <button @click="getUploadUrl">Get URL</button>
    <button @click="handleFileSend">Upload to S3</button>
  </div>
</template>

<script>
import { GetUploadUrl, UploadToBucket } from "../services/ImageServices";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: () => ({
    file: null,
    fileName: "",
    filePreview: null,
    uploadUrl: null,
  }),
  methods: {
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
    async getUploadUrl() {
      console.log("this.file.name :>> ", this.file.name);
      const payload = {
        filename: this.fileName,
      };
      const res = await GetUploadUrl(payload);
      this.uploadUrl = res.data.uploadUrl;
    },
    async handleFileSend() {
      // const formData = new FormData();
      // formData.append("file", this.file);
      const res = await UploadToBucket(this.uploadUrl, this.file);
      console.log("res :>> ", res);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
