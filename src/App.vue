<template>
  <div class="container">
    <h1 class="title">Label</h1>
    <upload-file />
    <span class="text">Hint text</span>
  </div>
</template>

<script>
import uploadFile from "./components/uploadFile.vue";

export default {
  components: {uploadFile}
  
}
</script>

<style>
@import './assets/global.css';
</style>
