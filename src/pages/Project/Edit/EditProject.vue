<template>
  <taskoo-boxed-content class="project-edit">
    <template #title>
      <div class="project-name">
        <span v-if="projectData.organisation" class="color-brick box-shadow" :title="projectData.organisation.name" v-bind:style= "[projectData.organisation.color ? {background: projectData.organisation.color.hexCode} : {}]"></span>
        {{ projectData.name }}
        <q-icon name="chevron_right"></q-icon>
        {{ $t('project.edit.title') }}
      </div>

      <div class="back">
        <router-link :to="{ name: 'Project', params: { projectId: projectData.id }}">
          <taskoo-icon-button>
            <q-icon name="arrow_back"></q-icon>
          </taskoo-icon-button>
        </router-link>
      </div>
    </template>

    <template #navigation>
      <taskoo-boxed-nav-entry to-name="EditProject" name="Allgemein">
      </taskoo-boxed-nav-entry>
      <taskoo-boxed-nav-entry :disabled="!projectData.isClosed" to-name="EditProjectUsers" name="Mitglieder">
      </taskoo-boxed-nav-entry>
    </template>

    <template #content>
      <router-view :model="model" v-if="$route.name === 'EditProjectUsers'"></router-view>

      <div class="edit-form" v-else>
        <taskoo-input :model="projectData.name" :label="$t('project.projectName')" @modelChanged="setProjectName"></taskoo-input>

        <div class="project-main-user">
          <taskoo-user-select v-if="projectUsers" :label="$t('project.projectLead')" :multi="false" :options="projectUsers"  :model="projectData.mainUser" @addedUser="setMainUser"></taskoo-user-select>
        </div>

        <taskoo-datepicker :label="$t('project.create.deadline')" :model="projectDate" @modelChanged="setDeadline"></taskoo-datepicker>

        <div class="project-visibility">
          <taskoo-switch v-model="projectStatus" :label="$t('project.closed')">
          </taskoo-switch>
        </div>

        <div class="project-description"  v-bind:class="{'is-focused': (descriptionIsFocused)}">
        <span class="label">
          {{ $t('project.description') }}
        </span>
          <vue-editor v-model="projectData.description" :placeholder="$t('project.description')" :editor-toolbar="taskToolbar" @focus="descriptionIsFocused = true" @blur="descriptionIsFocused = false"></vue-editor>
        </div>

        <button class="taskoo-button" @click="save(projectData)">
          {{ $t('taskoo.save') }}
        </button>

        <button class="taskoo-button delete" @click="toggleDeleteDialog" v-if="currentUser.permissions.project_create || currentUser.permissions.administration">
          {{ $t('project.edit.delete') }}
        </button>

        <!--    delete project dialog-->
        <taskoo-dialog class="taskoo-dialog"
                       :active="showDeleteDialog"
                       :title="$t('prompts.delete.project.title', {name: projectData.name})"
                       :content="$t('prompts.delete.project.description')"
                       :confirm-text="$t('prompts.delete.project.confirm')"
                       :cancel-text="$t('prompts.delete.project.cancel')"
                       @close="toggleDeleteDialog"
                       @confirm="deleteProject"
        >
        </taskoo-dialog>
      </div>
    </template>
  </taskoo-boxed-content>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

