<template>
  <div class="taskoo-datepicker">
    <span v-if="label" class="input-label" >{{ label }}</span>
    <div class="datepicker">
      <md-icon class="datepicker-icon">
        event
      </md-icon>

      <datepicker :disabled-dates="disabledDates" :format="customFormatter" v-model="inputModel" clear-button-icon="md-icon md-icon-font close-datepicker" @selected="dateChanged(...arguments)" :clear-button="true" :language="this.de"></datepicker>
    </div>
    </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

