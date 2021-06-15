<template>
  <div class="content-wrapper" v-if="$route.name !== 'Project'">
    <router-view @projectSaved="loadProject" :model="project"></router-view>
  </div>

  <div class="project-wrapper content-wrapper" v-else ref="contentType">


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
        <span v-if="project.team" class="color-brick box-shadow" :title="project.team.name" v-bind:style= "[project.team.color ? {background: project.team.color.hexCode} : {}]"></span>
        <h1 class="title">
            {{ project.name }}
        </h1>
        <span class="deadline" v-if="!isMobile && project.deadline">
          {{ $t('project.deadline') }} {{ project.deadline.date | moment('LL') }}
        </span>
        <div class="project-options">
          <q-icon class="taskoo-icon" name="lock" v-show="project.isClosed">
            <q-tooltip anchor="top middle" :offset="[0,30]">
              {{ $t('project.closed') }}
            </q-tooltip>
          </q-icon>

          <q-icon v-show="!project.isClosed" name="public" class="taskoo-icon">
            <q-tooltip anchor="top middle" :offset="[0,30]">
              {{ $t('project.public') }}
            </q-tooltip>
          </q-icon>

          <taskoo-icon-button v-bind:class="{'is-favorite': (project.isFavorite)}" @click="favorizeProject">
            <q-icon name="star"></q-icon>
          </taskoo-icon-button>

          <router-link :to="{ name: 'EditProject'}" v-if="userPermissions && (userPermissions.administration || userPermissions.project_edit)">
            <taskoo-icon-button>
              <q-icon name="edit"></q-icon>
            </taskoo-icon-button>
          </router-link>
        </div>

        <div class="project-users" v-if="!isMobile && project.users && project.users.length > 0">
          <taskoo-avatar class="user" v-for="user in project.users" :user="user">
            <q-tooltip anchor="top middle" :offset="[0,30]">
              {{ user.firstname }} {{ user.lastname }}
            </q-tooltip>
          </taskoo-avatar>
        </div>
      </div>

      <div class="project-description taskoo-scrollbar-y" v-if="project.description" v-html="project.description">
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
                <taskoo-icon-button>
                  <q-icon name="add"></q-icon>
                </taskoo-icon-button>
              </div>
            </li>
          </transition-group>
        </draggable>
      </div>

    <!--    delete taskgroup dialog-->
    <taskoo-dialog class="taskoo-dialog"
                   :active="showDeleteDialog"
                   :title="$t('prompts.delete.taskGroup.title', {name: deleteData.name})"
                   :content="$t('prompts.delete.taskGroup.description')"
                   :confirm-text="$t('prompts.delete.taskGroup.confirm')"
                   :cancel-text="$t('prompts.delete.taskGroup.cancel')"
                   @close="toggleDeleteDialog(false)"
                   @confirm="deleteGroup"
    >
    </taskoo-dialog>
    </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

