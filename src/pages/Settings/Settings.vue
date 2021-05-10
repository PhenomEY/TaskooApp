<template>
  <div class="settings-wrapper">
    <md-tabs  md-sync-route>
      <md-tab id="account-settings" md-label="Accounteinstellungen" to="/settings" exact>
        <account-settings :user="user"></account-settings>
      </md-tab>

      <md-tab id="profile-settings" md-label="Profileinstellungen" to="/settings/profile" :md-disabled="false">
        <router-view :user="user" @avatarChanged="setAvatar" @colorChanged="setColor"></router-view>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss"></style>
