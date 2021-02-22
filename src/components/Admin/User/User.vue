<template>
  <div>
    <router-view></router-view>

    <div v-if="$route.name === 'AdminUser'">

      <button class="create-user-button" @click="createUser()">
        <md-icon>add_circle_outline</md-icon>
        {{ $t('settings.users.createUser') }}
      </button>

      <div class="user-list box-shadow">
        <div class="actions">
          <md-button class="md-icon-button" @click="getUsers">
            <md-icon>refresh</md-icon>
          </md-button>
        </div>

        <div class="entry title">
          <div class="id">
            {{ $t('settings.users.list.id') }}
          </div>

          <div class="name">
            {{ $t('settings.users.list.name') }}
          </div>

          <div class="email">
            {{ $t('settings.users.list.email') }}
          </div>

          <div class="active">
            {{ $t('settings.users.list.active') }}
          </div>

          <div class="role">
            {{ $t('settings.users.list.role') }}
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
            {{ $store.state.auth.userRoles[user.role] }}
          </div>

          <div class="warnings" v-if="user.warnings">
            <md-tooltip class="warning-tooltip" md-direction="top">
              <div v-if="user.warnings.password">{{ $t('settings.users.list.warnings.password') }}</div>
              <div v-if="user.warnings.organisations">{{ $t('settings.users.list.warnings.organisations') }}</div>
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

