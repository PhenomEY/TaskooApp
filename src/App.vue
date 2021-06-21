<template>
  <div class="taskoo-app" id="q-app">

    <router-view v-if="publicUrls.includes($route.name)"></router-view>

    <taskoo-layout #content v-else-if="verifiedUser">
      <router-view></router-view>
    </taskoo-layout>

    <taskoo-loader v-else></taskoo-loader>
  </div>
</template>

<script src="./app.js"></script>

<style src="./app.scss" lang="scss">
</style>
