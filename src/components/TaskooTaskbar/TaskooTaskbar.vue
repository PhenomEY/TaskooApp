<template>
  <div class="taskoo-taskbar">

    <div class="menu-toggle" @click="toggleMenu">
      <md-icon>menu</md-icon>
    </div>

    <taskoo-searchfield></taskoo-searchfield>

    <multiselect v-if="availableOrganisations && availableOrganisations.length > 1" class="taskoo-select organisations"
                 v-model="currentOrganisation"
                 :options="availableOrganisations"
                 selectLabel=""
                 deselectLabel=""
                 selectedLabel=""
                 :searchable="false"
                 :allowEmpty="false"
                 v-bind:style= "[currentOrganisation.color ? {background: currentOrganisation.color} : {}]"
    >
      <template slot="singleLabel" slot-scope="props">
        <span>
          {{props.option.name}}
        </span>
      </template>

      <template slot="option" slot-scope="props" style="background:red">
        <span class="organisation-entry" v-bind:style= "[props.option.color ? {background: props.option.color} : {}]">{{ props.option.name }}</span>
      </template>
    </multiselect>

    <div class="icons-right">
      <taskoo-refresh :interval="refreshInterval"></taskoo-refresh>

      <md-badge :md-content="notificationCount" md-dense v-bind:class="{'no-badge': notificationCount === 0}">
        <v-popover offset="16" @hide="closedNotifications">
          <md-button class="md-icon-button notification tooltip-target">
            <md-icon>notifications</md-icon>
          </md-button>

          <template slot="popover">
            <div class="notification-popover">
              <div class="no-notifications" v-if="!notifications || notifications.length === 0">
                <md-icon>sentiment_dissatisfied</md-icon>
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

      </md-badge>


        <v-popover offset="0">
          <md-avatar class="md-avatar-icon taskoo-avatar">
            <img src="./avatar.gif" alt="Avatar" class="tooltip-target">
          </md-avatar>
          <template slot="popover">
            <div class="taskoo-popover-options">
              <div class="option logged-in-as">
                {{ $t('taskoo.loggedInAs', {firstname: currentUser.firstname, lastname: currentUser.lastname}) }}
              </div>

              <div class="option dark-mode" v-if="!isDark || isDark === 'false'" @click="toggleViewMode">
                <md-icon>
                  nightlight_round
                </md-icon>
                {{ $t('navigation.darkMode') }}
              </div>

              <div class="option light-mode" @click="toggleViewMode" v-else>
                <md-icon>
                  light_mode
                </md-icon>
                {{ $t('navigation.lightMode') }}
              </div>

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
