<template>
  <div class="taskoo-layout">
    <div class="drawer">
      <div class="drawer-logo">
        <router-link :to="{name: 'Dashboard'}">
        <taskoo-logo />
        </router-link>
      </div>

      <div class="drawer-account">
        <taskoo-avatar :user="currentUser" />

        <div class="user-information">
          <span class="user-name">
            {{ currentUser.firstname }} <strong>{{ currentUser.lastname }}</strong>
          </span>

          <span class="user-role" v-if="currentUser.teamrole">
            {{ currentUser.teamrole.name }}
          </span>
        </div>
      </div>

      <div class="drawer-content t-s-v_dark">
        <div class="main">
          <router-link v-bind:class="{'drawer-entry-active': ($route.name === 'Dashboard')}" class="drawer-entry" :to="{ name: 'Dashboard'}">
                  <span class="drawer-entry-icon">
            <q-icon name="o_home" />
          </span>
            {{ $t('navigation.dashboard') }}
          </router-link>

          <router-link v-bind:class="{'drawer-entry-active': ($route.name === 'Tasks')}" class="drawer-entry" :to="{ name: 'Tasks'}">
                  <span class="drawer-entry-icon">
            <q-icon name="o_task_alt" />
          </span>
            {{ $t('navigation.tasks') }}
          </router-link>

          <router-link class="drawer-entry" :to="{ name: 'Teams'}">
                  <span class="drawer-entry-icon">
            <q-icon name="o_groups" />
          </span>
            {{ $t('navigation.teams') }}
          </router-link>

          <router-link v-bind:class="{'drawer-entry-active': ($route.name === 'Settings' || $route.matched[0].name === 'Settings')}" class="drawer-entry" :to="{ name: 'Settings'}">
                  <span class="drawer-entry-icon">
            <q-icon name="o_settings" />
          </span>
            {{ $t('navigation.settings') }}
          </router-link>

          <router-link v-bind:class="{'drawer-entry-active': ($route.name === 'Administration' || $route.matched[0].name === 'Administration')}" v-if="currentUser.permissions.administration" class="drawer-entry" :to="{ name: 'Administration'}">
                  <span class="drawer-entry-icon">
            <q-icon name="o_build" />
          </span>
            {{ $t('navigation.admin') }}
          </router-link>
        </div>

        <div class="projects t-s-v_dark">
          <div class="favorites" v-if="favorites">
            <div class="drawer-headline">
              {{ $t('navigation.projects.favorites') }}
            </div>

            <draggable group="favorites" :list="favorites" v-bind="dragOptions" handle=".drag" @change="updateFavorites(favorites)">
            <router-link v-for="favorite in favorites" class="drawer-entry favorite" :to="{ name: 'Project', params: { projectId: favorite.id }}">
              <div class="project-entry">
                     <span class="drawer-entry-icon" :title="favorite.team.name">
                      <q-icon name="star" v-bind:style= "[favorite.team.color ? {color: favorite.team.color.hexCode} : {}]" />
                  </span>
                <span class="project-name">{{ favorite.name }}</span>
                <q-icon class="is-locked" name="lock" v-if="favorite.isClosed"></q-icon>
              </div>

              <span class="drag">
                <q-icon name="drag_indicator"></q-icon>
              </span>
            </router-link>
            </draggable>
          </div>

          <div class="your-projects">
            <div class="drawer-headline">
              {{ $t('navigation.projects.title') }}
            </div>

            <router-link v-if="projects" v-for="project in projects" class="drawer-entry" :to="{ name: 'Project', params: { projectId: project.id }}">
                  <span class="drawer-entry-icon" :title="project.team.name">
                     <q-icon name="play_arrow" v-bind:style= "[project.team.color ? {color: project.team.color.hexCode} : {}]" />
                  </span>
              <span class="project-name">{{ project.name }}</span>
              <q-icon class="is-locked" name="lock" v-if="project.isClosed"></q-icon>
            </router-link>
          </div>

          <router-link v-if="userPermissions && (userPermissions.administration || userPermissions.project_create)" class="drawer-entry" :to="{ name: 'CreateProject'}">
                  <span class="drawer-entry-icon">
            <q-icon name="o_add" />
          </span>
            {{ $t('navigation.projects.create') }}
          </router-link>
        </div>
      </div>

      <div class="drawer-logout">
        <div class="drawer-entry logout" @click="logout">
          <span class="drawer-entry-icon">
            <q-icon name="o_logout" />
          </span>
          {{ $t('navigation.logout') }}
        </div>
      </div>

    </div>

    <div class="content-section">
      <taskoo-taskbar />
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style src="./style.scss" lang="scss"></style>

<script src="./index.js"></script>
