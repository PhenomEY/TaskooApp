<template>
  <taskoo-boxed-content class="create-project">
    <template #title>
      {{ $t('project.create.title', { team: currentOrganisation.name }) }}
    </template>

    <template #content>
      <form novalidate class="form" @submit.prevent="createProject">

        <taskoo-input type="text" :label="$t('project.projectName')" :placeholder="$t('project.projectName')" :model="projectName" @modelChanged="setProjectName(...arguments)"></taskoo-input>

        <taskoo-datepicker :label="$t('project.create.deadline')" @modelChanged="setDeadline(...arguments)"></taskoo-datepicker>

        <div class="project-users">
          <taskoo-user-select :label="$t('project.projectLead')" :multi="false" :options="availableUsers" @addedUser="userSelected"></taskoo-user-select>
        </div>

        <div class="project-visibility">
          <taskoo-switch v-model="closed" :label="$t('project.closed')">
          </taskoo-switch>
        </div>


        <button class="taskoo-button" type="submit">
          {{ $t('project.create.submit') }}
        </button>
      </form>
    </template>
  </taskoo-boxed-content>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

