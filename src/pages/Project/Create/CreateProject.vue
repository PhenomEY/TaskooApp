<template>
  <div class="create-project">
    <form novalidate class="form" @submit.prevent="createProject">

      <taskoo-input type="text" label="Projektname" placeholder="Projektname" :model="projectName" @modelChanged="setProjectName(...arguments)"></taskoo-input>

      <taskoo-datepicker label="Voraussichtliches Abschlussdatum" @modelChanged="setDeadline(...arguments)"></taskoo-datepicker>

      <taskoo-user-select :multi="false" :options="projectUsers" :disabled="true"></taskoo-user-select>

      <button class="taskoo-button" type="submit">
        Erstellen
      </button>
    </form>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

