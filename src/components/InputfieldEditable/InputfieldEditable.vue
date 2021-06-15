<template>
  <div class="inputfield-editable">
    <input type="text" name="kommentar" v-model="model" :title="model" @blur="noFocus" @focus="editComment($event)" @change="saveComment($event)" readonly>
  </div>
</template>

<style lang="scss" src="./style.scss">
</style>

<script src="./index.js"></script>
