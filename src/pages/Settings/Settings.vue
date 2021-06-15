<template>
  <taskoo-boxed-content class="settings-wrapper">
    <template #title>{{ $t('settings.title') }}</template>

    <template #navigation>
      <taskoo-boxed-nav-entry to-name="Settings" :name="$t('settings.account_settings.title')"></taskoo-boxed-nav-entry>
      <taskoo-boxed-nav-entry to-name="ProfileSettings" :name="$t('settings.profile_settings.title')"></taskoo-boxed-nav-entry>
    </template>

    <template #content>
      <account-settings v-if="$route.name === 'Settings'" :user="user"></account-settings>
      <router-view v-else :user="user" @avatarChanged="setAvatar" @colorChanged="setColor"></router-view>
    </template>
  </taskoo-boxed-content>
</template>

<script src="./index.js">
</script>

<style src="./style.scss" lang="scss"></style>
