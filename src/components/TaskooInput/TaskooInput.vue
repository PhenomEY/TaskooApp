<template>
      <div class="taskoo-input">
        <span v-if="label" class="input-label" >{{ label }}</span>
        <input class="box-shadow" :type="type" :placeholder="placeholder" v-model="inputModel" @change="modelChange">
      </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

