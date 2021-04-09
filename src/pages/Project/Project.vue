<template>
  <div class="project-wrapper" ref="contentType">
    <taskoo404 v-if="notFound" :label="$t('project.notFound')"></taskoo404>

    <div class="project-loader" v-else-if="loading">
      <div class="project-content">
        <div class="project-header">
          <PuSkeleton class="taskoo-skeleton" />
        </div>

        <div class="task-groups">
          <span class="transition-group">

          <div class="task-group">
            <PuSkeleton class="taskoo-skeleton" />
          </div>

          <div class="task-group">
            <PuSkeleton class="taskoo-skeleton" />
          </div>

          <div class="task-group">
            <PuSkeleton class="taskoo-skeleton" />
          </div>

          <div class="task-group">
            <PuSkeleton class="taskoo-skeleton" />
          </div>

          <div class="task-group">
            <PuSkeleton class="taskoo-skeleton" />
          </div>
          </span>
        </div>
      </div>
    </div>

    <div v-else class="project-content">
      <div class="project-header">
        <span v-if="project.organisation" class="color-brick box-shadow" :title="project.organisation.name" v-bind:style= "[project.organisation.color ? {background: project.organisation.color} : {}]"></span>
        <h1 class="title">
            {{ project.name }}
        </h1>
        <span class="deadline" v-if="!isMobile && project.deadline">
          {{ $t('project.deadline') }} {{ project.deadline.date | moment('LL') }}
        </span>
        <div class="project-options">
          <md-icon v-show="project.isClosed">
            <md-tooltip md-direction="top">{{ $t('project.closed') }}</md-tooltip>
            lock
          </md-icon>

          <md-icon v-show="!project.isClosed">
            <md-tooltip md-direction="top">{{ $t('project.public') }}</md-tooltip>
            public
          </md-icon>

          <md-button class="md-icon-button md-list-action">
            <md-icon>star</md-icon>
          </md-button>

          <md-button class="md-icon-button md-list-action" v-if="userPermissions && (userPermissions.administration || userPermissions.project_edit)" :to="{ name: 'EditProject'}">
            <md-icon>edit</md-icon>
          </md-button>
        </div>

        <div class="project-users" v-if="!isMobile && project.users">
          <md-avatar class="user md-avatar-icon" v-for="user in project.users" v-bind:style= "[user.hexCode ? {background: user.hexCode} : {}]">
            <md-tooltip md-direction="top">{{ user.firstname }} {{ user.lastname }}</md-tooltip>
            {{ user.firstname.charAt(0) }}{{ user.lastname.charAt(0) }}
          </md-avatar>
        </div>
      </div>

        <draggable v-touch:swipe="swipeHandler" :disabled="isMobile" v-model="groups" class="task-groups" v-bind="dragOptions" handle=".group-drag" @change="changedGroupPositions(groups)">
          <transition-group type="transition" class="transition-group">
            <li
                class="task-group-item"
                v-for="(item, key) in groups"
                :key="key"
                :data-groupKey="key"
            >
              <task-group :tasksLoading="item.tasksLoading"
                          :showDoneTasks="item.showDoneTasks"
                          :addingTask="addingTask"
                          :addingGroup="addingGroup"
                          :model="item.tasks"
                          :groupId="item.id"
                          :groupKey="key"
                          :groupName="item.name"
                          :isMobile="isMobile"
                          group="taskGroups"
                          @addGroup="addNewGroup"
                          @addTask="addTask(...arguments)"
                          @changedGroupName="changeGroupName(...arguments)"
                          @changeTaskName="changeTaskName(...arguments)"
                          @changeTaskPositions="changeTaskPositions(...arguments)"
                          @finishTask="finishTask(...arguments)"
                          @getDoneTasks="getDoneTasks(...arguments)"
                          @getOpenTasks="getOpenTasks(...arguments)"
                          @deleteGroup="toggleDeleteDialog(...arguments)"
                          :ref="'group-'+key"
              ></task-group>
            </li>
            <li key="addBtn" class="task-group-item" v-if="groups.length === 0">
              <div class="add-first-group" @click="addNewGroup">
                <md-button class="md-icon-button md-list-action">
                  <md-icon>add</md-icon>
                </md-button>
              </div>
            </li>
          </transition-group>
        </draggable>
      </div>

    <!--    delete taskgroup dialog-->
    <md-dialog-confirm
      :md-active.sync="showDeleteDialog"
      :md-title="$t('prompts.delete.taskGroup.title', {name: deleteData.name})"
      :md-content="$t('prompts.delete.taskGroup.description')"
      :md-confirm-text="$t('prompts.delete.taskGroup.confirm')"
      :md-cancel-text="$t('prompts.delete.taskGroup.cancel')"
      @md-cancel="toggleDeleteDialog(false)"
      @md-confirm="deleteGroup"
      class="taskoo-dialog"
    />

    <router-view @projectSaved="loadProject" :model="project"></router-view>

    </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

