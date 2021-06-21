<template>
  <div class="admin-main loader" v-if="loading">
    <div class="taskoo-input">
      <PuSkeleton class="taskoo-skeleton" />
    </div>

    <div class="subline">
      <span>{{ $t('administration.main.mailer.title') }}</span>
    </div>

    <div class="taskoo-input">
      <PuSkeleton class="taskoo-skeleton" />
    </div>
  </div>

  <div class="admin-main" v-else>
    <taskoo-input  @modelChanged="setAppURL(...arguments)" :error="!settings.app_url" :label="$t('administration.main.appurl')" :help-text="$t('administration.main.appurl_helptext')" :model="settings.app_url" :placeholder="$t('administration.main.appurl_placeholder')"></taskoo-input>

    <div class="subline">
      <span>{{ $t('administration.main.mailer.title') }}</span>
    </div>

    <taskoo-input  @modelChanged="setMailSender(...arguments)" :error="!settings.sender" :label="$t('administration.main.mailer.sender')" :help-text="$t('administration.main.mailer.sender_helptext')" :model="settings.sender" :placeholder="$t('administration.main.mailer.sender_placeholder')"></taskoo-input>

    <button class="taskoo-button" type="submit" @click="saveMainSettings">
      {{ $t('taskoo.save') }}
    </button>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

