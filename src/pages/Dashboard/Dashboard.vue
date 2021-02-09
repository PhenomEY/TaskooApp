<template>
  <div class="dashboard-wrapper">

    <div class="dashboard">
      <div class="first-row">
        <div class="welcome tile box-shadow">
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

      <div class="notifications box-shadow" v-if="notifications && !loadingNotifications">
        <div class="entry title">
          {{ $t('dashboard.notifications') }}
        </div>

        <div class="entry" v-for="notification in notifications">
          <span class="message" v-if="notification.message === 'task_assigned'">{{ notification.firstname }} {{ notification.lastname }} {{ $t('dashboard.notification.task.first') }} <span class="to-notification" @click="goToTask(notification.taskId)">{{ notification.taskName }}</span> {{ $t('dashboard.notification.task.assigned') }}.</span>
          <span class="message" v-if="notification.message === 'project_assigned'">{{ notification.firstname }} {{ notification.lastname }} {{ $t('dashboard.notification.project.first') }} <span class="to-notification" @click="goToProject(notification.projectId)">{{ notification.projectName }}</span> {{ $t('dashboard.notification.project.assigned') }}.</span>

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
