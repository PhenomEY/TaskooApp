<template>
  <div class="file-preview" v-if="files.length > 0">
    <preview-box v-for="(file, index) in files" :file="file" @delete="deleteFile(index, ...arguments)"></preview-box>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

