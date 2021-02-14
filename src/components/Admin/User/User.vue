<template>
  <div>
    <router-view></router-view>

    <div v-if="$route.name === 'AdminUser'">ListUsers</div>

  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

