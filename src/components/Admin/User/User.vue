<template>
  <div>
    <router-view></router-view>

    <div v-if="$route.name === 'AdminUser'">

      <button class="create-user-button" @click="createUser()">
        <md-icon>add_circle_outline</md-icon>
        {{ $t('settings.users.createUser') }}
      </button>

      <div class="user-list box-shadow">
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

        <div class="entry" v-for="user in users">
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

          <div class="actions">
            <md-button class="md-icon-button md-list-action">
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

