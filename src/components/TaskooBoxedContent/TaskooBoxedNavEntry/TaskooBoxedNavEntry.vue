<template>
  <router-link :event="!disabled ? 'click' : ''" :to="{ name: toName }" v-bind:class="{'nav-entry-active': ($route.name === toName || isActive)}" :disabled="disabled" class="boxed-content-nav-entry">
    {{ name }}
  </router-link>
</template>

<style src="./style.scss" lang="scss">
</style>

<script src="./index.js"></script>

