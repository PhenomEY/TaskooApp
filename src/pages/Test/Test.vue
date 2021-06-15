<template>
  <div>
    TESTPAGE

    <div class="taskoo-field">
      <taskoo-switch v-model="testValue" :disabled="false"></taskoo-switch>
    </div>


    <div class="taskoo-field">
      <taskoo-switch v-model="testValue" label="Administration" :disabled="false"></taskoo-switch>
    </div>

    <div class="taskoo-field">
      <taskoo-switch v-model="testValue2" label="Rüdiger" :disabled="true"></taskoo-switch>
    </div>

    Value : {{ testValue }}

    <q-icon name="o_settings"></q-icon>


    <taskoo-avatar :user="currentUser"></taskoo-avatar>

    <taskoo-icon-button icon-name="home"></taskoo-icon-button>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>
