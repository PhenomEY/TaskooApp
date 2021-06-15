<template>
  <div class="taskoo-datepicker">
    <span v-if="label" class="input-label" >{{ label }}</span>
    <div class="datepicker">
      <q-icon class="datepicker-icon" name="event"></q-icon>

      <datepicker :disabled-dates="disabledDates" :format="customFormatter" v-model="inputModel" clear-button-icon="material-icons q-icon close-datepicker" @selected="dateChanged(...arguments)" :clear-button="true" :language="this.de"></datepicker>
    </div>
    </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

