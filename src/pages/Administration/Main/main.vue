<template>
  <div class="admin-main">
    <taskoo-input @modelChanged="setAppURL(...arguments)" :error="!settings.app_url && !loading" :label="$t('settings.main.appurl')" :model="settings.app_url" :placeholder="$t('settings.main.appurl_placeholder')"></taskoo-input>

    <button class="taskoo-button" type="submit" @click="saveMainSettings">
      {{ $t('taskoo.save') }}
    </button>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

