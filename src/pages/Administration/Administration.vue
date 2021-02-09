<template>
  <div class="administration-wrapper">
    <md-tabs md-sync-route>
      <md-tab id="system" md-label="Grundeinstellungen" to="/admin" exact>
        AAA
      </md-tab>

      <md-tab id="user-create" md-label="Create User" to="/admin/user/create" exact>
        <router-view></router-view>
      </md-tab>
      <md-tab id="user-list" md-label="Users" to="/admin/user/list">
        <router-view></router-view>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss"></style>
