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
        <h1 class="title">
            {{ project.name }}
        </h1>
        <span class="deadline" v-if="!isMobile">
          {{ $t('project.deadline') }} {{ project.deadline.date | moment('LL') }}
        </span>
        <div class="project-options">
          <md-button class="md-icon-button md-list-action">
            <md-icon>star</md-icon>
          </md-button>

          <md-button class="md-icon-button md-list-action">
            <md-icon>edit</md-icon>
          </md-button>
        </div>

        <div class="project-users" v-if="!isMobile">
          <md-avatar class="user md-avatar-icon">
            <md-tooltip md-direction="top">Damian Plewka</md-tooltip>
            DP
          </md-avatar>
          <md-avatar class="user md-avatar-icon">
            <md-tooltip md-direction="top">Ioannis Pourliotis</md-tooltip>
            IP
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
                          @deleteGroup="deleteGroup(...arguments)"
              ></task-group>
            </li>
          </transition-group>
        </draggable>
      </div>
    </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

