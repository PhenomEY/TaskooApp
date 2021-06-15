<template>

  <taskoo-boxed-content class="administration-wrapper">
    <template #title>
      {{ $t('navigation.admin') }}
    </template>

    <template #navigation>
      <taskoo-boxed-nav-entry to-name="Administration" :name="$t('administration.main.title')" />
      <taskoo-boxed-nav-entry to-name="AdminUser" :has-subs="true" :name="$t('administration.users.title')" />
      <taskoo-boxed-nav-entry to-name="AdminOrganisations" :name="$t('administration.organisations.title')" />
    </template>

    <template #content>
      <admin-main v-if="$route.name === 'Administration'"></admin-main>
      <router-view></router-view>
    </template>
  </taskoo-boxed-content>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss"></style>
