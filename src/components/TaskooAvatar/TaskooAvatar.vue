<template>
  <div class="taskoo-avatar" v-bind:style="[(user.color && !user.avatar) ? {background: user.color.hexCode, borderColor: user.color.hexCode} : {}]">
    <slot></slot>
    <img v-if="user.avatar" :src="API_URL+'/file/'+user.avatar.filePath">
    <span class="user-initials" v-else>
      {{ user.firstname.charAt(0) }}{{ user.lastname.charAt(0) }}
    </span>
  </div>
</template>

<style lang="scss" src="./style.scss">
</style>

<script src="./index.js"></script>
