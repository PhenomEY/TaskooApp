<template>
  <div class="taskoo-taskbar">

    <div class="menu-toggle" @click="toggleMenu">
      <md-icon>menu</md-icon>
    </div>

    <taskoo-searchfield></taskoo-searchfield>

<!--    <taskoo-select :model="currentOrg" type="single" @changed="orgChanged(...arguments)" placeholder="Bitte auswählen...">-->
<!--      <div class="option" :t-value="1" v-close-popover>-->
<!--        webpiloten-->
<!--      </div>-->

<!--      <div class="option" :t-value="2" v-close-popover>-->
<!--        bitpiloten-->
<!--      </div>-->
<!--    </taskoo-select>-->
    <div class="icons-right">
      <taskoo-refresh :interval="refreshInterval"></taskoo-refresh>

      <md-badge :md-content="notificationCount" md-dense v-bind:class="{'no-badge': notificationCount === 0}">
        <v-popover offset="16" @hide="closedNotifications">
          <md-button class="md-icon-button notification tooltip-target">
            <md-icon>notifications</md-icon>
          </md-button>

          <template slot="popover">
            <div class="notification-popover">
              <div class="no-notifications" v-if="!notifications">
                <md-icon>sentiment_dissatisfied</md-icon>
                Keine neuen Benachrichtigungen
              </div>

              <div class="notifications">
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

      </md-badge>


        <v-popover offset="0">
          <md-avatar class="md-avatar-icon taskoo-avatar">
            <img src="./avatar.gif" alt="Avatar" class="tooltip-target">
          </md-avatar>
          <template slot="popover">
            <div class="taskoo-popover-options">
              <div class="option profile" v-close-popover @click="">
                  <md-icon>settings</md-icon>
                  {{ $t('navigation.settings') }}
              </div>

              <div class="option logout" v-close-popover @click="logout()">
                <md-icon>logout</md-icon> {{ $t('navigation.logout') }}
              </div>
            </div>
          </template>
        </v-popover>

    </div>
  </div>
</template>

<style src="./taskbar.scss" lang="scss"></style>

<script src="./taskbar.js"></script>
