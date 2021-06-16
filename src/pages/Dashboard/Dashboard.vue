<template>
  <div class="dashboard-wrapper content-wrapper">

    <div class="dashboard">
      <div class="first-row">
        <div class="welcome tile">
          <span class="welcome-text">
            {{ $t('dashboard.welcome', {'name': $store.state.user.user.firstname}) }}
          </span>
        </div>

        <div class="tile date">

          <div class="day">
            {{ $moment(currentTime).format('D')}}
          </div>

          <div class="month-time">
            <div class="month">
              {{ $moment(currentTime).format('MMMM')}}
            </div>

            <div class="time">
              {{ $moment(currentTime).format('LT')}}
            </div>
          </div>


        </div>
      </div>

      <div class="notifications skeleton" v-if="loadingNotifications">
        <div class="entry">
          <PuSkeleton class="taskoo-skeleton" />
        </div>
      </div>

      <div class="notifications-title" v-show="notifications && !loadingNotifications && notifications.length > 0">
        {{ $t('dashboard.notifications') }}
      </div>
      <div class="notifications box-shadow" v-if="notifications && !loadingNotifications && notifications.length > 0">
        <div class="entry" v-for="notification in notifications">
          <taskoo-avatar :user="notification.byUser"></taskoo-avatar>
          <span class="message" v-if="notification.message === 'task_assigned'">
            {{ notification.byUser.firstname }} {{ notification.byUser.lastname }} {{ $t('dashboard.notification.task.first') }}

            <router-link v-if="notification.task" :to="{ name: 'Task', params: {taskId: notification.task.id}}">
                <span class="to-notification">{{ notification.task.name }}</span>
            </router-link>

            {{ $t('dashboard.notification.task.assigned') }}.</span>

          <span class="message" v-if="notification.message === 'project_assigned'">
            {{ notification.byUser.firstname }} {{ notification.byUser.lastname }}
            {{ $t('dashboard.notification.project.first') }}

          <router-link v-if="notification.project" :to="{ name: 'Project', params: {projectId: notification.project.id}}">
            <span class="to-notification">{{ notification.project.name }}</span>
          </router-link>

            {{ $t('dashboard.notification.project.assigned') }}.</span>
          <span class="time">
            {{ notification.time.date | moment("from", "now") }}
          </span>
        </div>
      </div>

      <div class="taskoo-tasklist skeleton" v-if="loadingTasks">
        <div class="entry">
          <PuSkeleton class="taskoo-skeleton" />
        </div>
      </div>

      <task-list v-else type="dashboard" :tasks="tasks" :noDragging="true" :title="$t('dashboard.dueTasks')" @finishTask="finishTask(...arguments)" @changedTaskName="changeTaskName(...arguments)"></task-list>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss"></style>
