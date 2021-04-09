<template>
  <div class="edit-project-wrapper" @click="close($event)">
    <div class="edit-project-modal box-shadow">
      <md-tabs md-sync-route>
        <md-tab id="system" md-label="Allgemein" :to="'/project/'+projectId+'/edit'" exact>

          <div class="edit-loading" v-if="loading">
            <PuSkeleton class="taskoo-skeleton" />

            <PuSkeleton class="taskoo-skeleton" />

            <PuSkeleton class="taskoo-skeleton" />
          </div>

          <div class="tab-content" v-else>
            <taskoo-input :model="projectData.name" :label="$t('project.projectName')" @modelChanged="setProjectName"></taskoo-input>

            <div class="project-main-user">
              <div class="label">{{ $t('project.projectLead') }}</div>
              <taskoo-user-select :multi="false" :options="projectUsers"  :model="projectData.mainUser" @addedUser="setMainUser"></taskoo-user-select>
            </div>

            <taskoo-datepicker :label="$t('project.create.deadline')" :model="projectDate" @modelChanged="setDeadline"></taskoo-datepicker>

            <div class="project-visibility">
              <md-radio v-model="projectStatus" :value="false">{{ $t('project.create.public') }}</md-radio>
              <md-radio v-model="projectStatus" :value="true">{{ $t('project.create.closed') }}</md-radio>
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
          </div>

        </md-tab>

        <md-tab id="user-list" :md-disabled="!projectData.isClosed" md-label="Mitglieder" :to="'/project/'+projectId+'/edit/users'">
          <router-view name="users" :model="model" @userAdded="emitChange"></router-view>
        </md-tab>

        <md-tab id="close" md-label="Schließen" :to="'/project/'+projectId">
        </md-tab>

      </md-tabs>
    </div>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

