<template>
  <div class="textarea-editable">
    <textarea name="kommentar" :rows="rows" :value="value" @dblclick="editComment($event)" @blur="saveComment($event)" readonly></textarea>
  </div>
</template>

<style lang="scss" src="./style.scss">
</style>

<script src="./index.js"></script>
