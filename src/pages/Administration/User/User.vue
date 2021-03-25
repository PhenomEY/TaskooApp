<template>
  <div class="user-view">
    <router-view></router-view>

    <div v-if="$route.path === '/admin/user'">

      <button class="create-user-button" @click="createUser()">
        <md-icon>add_circle_outline</md-icon>
        {{ $t('administration.users.createUser') }}
      </button>

      <div class="taskoo-list box-shadow">
        <div class="actions">
          <md-button class="md-icon-button" @click="getUsers">
            <md-icon>refresh</md-icon>
          </md-button>
        </div>

        <div class="entry title">
          <div class="id">
            {{ $t('administration.users.list.id') }}
          </div>

          <div class="name">
            {{ $t('administration.users.list.name') }}
          </div>

          <div class="email">
            {{ $t('administration.users.list.email') }}
          </div>

          <div class="active">
            {{ $t('administration.users.list.active') }}
          </div>

          <div class="role">
            {{ $t('administration.users.list.role') }}
          </div>
        </div>

        <div class="entry loading" v-if="loading">
          <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>

        <div class="entry" v-if="!loading" v-for="user in users">
          <div class="id">
            {{ user.id }}
          </div>

          <div class="name">
            {{ user.firstname }} {{ user.lastname }}
          </div>

          <div class="email">
            {{ user.email }}
          </div>

          <div class="active" v-bind:class="{'true': (user.active === true)}">
            <span></span>
          </div>

          <div class="role">
            <span v-if="user.isAdmin" class="admin-label">{{ $t('administration.users.list.administrator') }}</span>
          </div>

          <div class="warnings" v-if="user.warnings">
            <md-tooltip class="warning-tooltip" md-direction="top">
              <div v-if="user.warnings.password">{{ $t('administration.users.list.warnings.password') }}</div>
              <div v-if="user.warnings.organisations">{{ $t('administration.users.list.warnings.organisations') }}</div>
            </md-tooltip>
            <md-icon>warning</md-icon>
          </div>

          <div class="actions">
            <md-button class="md-icon-button md-list-action" :to="{ name: 'AdminUserEdit', params: { id: user.id }}">
              <md-icon>edit</md-icon>
            </md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

