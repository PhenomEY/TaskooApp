<template>
  <div class="taskoo-taskbar">

    <div class="menu-toggle" @click="toggleMenu">
      <q-icon name="menu"></q-icon>
    </div>

    <taskoo-searchfield />

    <multiselect v-if="availableTeams && availableTeams.length > 1" class="taskoo-select organisations"
                 v-model="currentTeam"
                 :options="availableTeams"
                 selectLabel=""
                 deselectLabel=""
                 selectedLabel=""
                 :searchable="false"
                 :allowEmpty="false"
                 v-bind:style= "[currentTeam.color ? {borderColor: currentTeam.color.hexCode} : {}]"
    >
      <template slot="singleLabel" slot-scope="props">
        <span>
          {{props.option.name}}
        </span>
      </template>

      <template slot="option" slot-scope="props">
        <span class="organisation-entry" v-bind:style= "[props.option.color ? {color: props.option.color.hexCode} : {}]">{{ props.option.name }}</span>
      </template>
    </multiselect>

    <div class="icons-right">
        <v-popover offset="16" @hide="closedNotifications">
          <taskoo-icon-button class="notification tooltip-target">
            <q-icon name="notifications"></q-icon>
            <div v-if="notificationCount" class="notifications-count">{{ notificationCount }}</div>
          </taskoo-icon-button>

          <template slot="popover">
            <div class="notification-popover">
              <div class="no-notifications" v-if="!notifications || notifications.length === 0">
                <q-icon name="sentiment_dissatisfied" />
                Keine neuen Benachrichtigungen
              </div>

              <div class="notifications" v-else>
                <div class="entry" v-for="notification in notifications">
                  <span class="message" v-if="notification.message === 'task_assigned'">{{ notification.firstname }} {{ notification.lastname }} {{ $t('dashboard.notification.task.first') }} <span class="to-notification" @click="goToTask(notification.taskId)">{{ notification.taskName }}</span> {{ $t('dashboard.notification.task.assigned') }}.</span>
                  <span class="message" v-if="notification.message === 'project_assigned'">{{ notification.firstname }} {{ notification.lastname }} {{ $t('dashboard.notification.project.first') }} <span class="to-notification" @click="goToProject(notification.projectId)">{{ notification.projectName }}</span> {{ $t('dashboard.notification.project.assigned') }}.</span>

                  <span class="time">
            {{ notification.time.date | moment("from", "now") }}
          </span>
                </div>
              </div>
            </div>
          </template>
        </v-popover>
    </div>
  </div>
</template>

<style src="./taskbar.scss" lang="scss"></style>

<script src="./taskbar.js"></script>
