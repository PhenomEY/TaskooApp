<template>
  <div class="organisations-wrapper">
    <div v-for="organisation in organisations">
      {{ organisation.id }} {{ organisation.name }}
    </div>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

