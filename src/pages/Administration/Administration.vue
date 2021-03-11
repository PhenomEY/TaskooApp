<template>
  <div class="settings-wrapper">
    <md-tabs v-if="verifiedAdmin" md-sync-route>
      <md-tab id="system" :md-label="$t('settings.main.title')" to="/admin" exact>
        <admin-main></admin-main>
      </md-tab>

      <md-tab id="user-list" :md-label="$t('settings.users.title')" to="/admin/user">
        <router-view name="adminUsers"></router-view>
      </md-tab>

      <md-tab id="organisations" :md-label="$t('settings.organisations.title')" to="/admin/organisations">
        <router-view name="adminOrganisations"></router-view>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss"></style>
