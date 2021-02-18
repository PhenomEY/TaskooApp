<template>
      <div class="taskoo-input" v-bind:class="{'error': (error)}">
        <span v-if="label" class="input-label" >{{ label }}</span>
        <input class="box-shadow" :type="type" :placeholder="placeholder" v-model="inputModel" @change="modelChange" :required="required ? true : false">
      </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

