<template>
  <div class="create-project">
    <div class="create-header">
      <h1 class="title">Neues Projekt <span v-if="availableOrganisations.length > 1">in {{ currentOrganisation.name }}</span> anlegen</h1>
    </div>

    <form novalidate class="form" @submit.prevent="createProject">

      <taskoo-input type="text" label="Projektname" placeholder="Projektname" :model="projectName" @modelChanged="setProjectName(...arguments)"></taskoo-input>

      <taskoo-datepicker label="Voraussichtliches Abschlussdatum" @modelChanged="setDeadline(...arguments)"></taskoo-datepicker>

      <div class="project-users">
        <div class="label">Projektverantwortlicher</div>
        <taskoo-user-select :multi="false" :options="availableUsers" @addedUser="userSelected"></taskoo-user-select>
      </div>

      <div class="project-visibility">
        <md-radio v-model="closed" :value="false">Öffentlich</md-radio>
        <md-radio v-model="closed" :value="true">Geschlossen</md-radio>
      </div>


      <button class="taskoo-button" type="submit">
        Erstellen
      </button>
    </form>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

