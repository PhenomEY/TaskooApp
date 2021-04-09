<template>
  <div class="settings-wrapper">
    <md-tabs  md-sync-route>
      <md-tab id="account-settings" md-label="Accounteinstellungen" to="/settings" exact>
        <account-settings :userId="currentUser.id"></account-settings>
      </md-tab>

      <md-tab id="organisations" md-label="Profileinstellungen" to="" :md-disabled="true">
      </md-tab>
    </md-tabs>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss"></style>
