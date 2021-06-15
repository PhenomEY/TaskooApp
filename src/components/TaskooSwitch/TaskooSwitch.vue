<template>
  <div class="taskoo-switch-field" v-bind:class="{'disabled': disabled}">
    <div class="taskoo-switch">
      <input type="checkbox" v-model="content" :disabled="disabled" @change="handleChange">
      <div class="switch-state">
        <div class="switch-knob"></div>
      </div>
    </div>

    <div v-if="label" class="taskoo-switch-label">
      {{ label }}
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss">
</style>

<script src="./index.js"></script>
