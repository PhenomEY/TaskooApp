<template>
  <div class="user-view">
    <router-view @return="reload"></router-view>
    <div class="user-view-inner" v-if="$route.path === '/admin/user'">
      <button class="create-user-button" @click="createUser()">
        <q-icon name="add_circle_outline"></q-icon>
        {{ $t('administration.users.createUser') }}
      </button>

      <div class="taskoo-list box-shadow">
        <div class="actions">
          <taskoo-icon-button @click="getUsers">
            <q-icon name="refresh"></q-icon>
          </taskoo-icon-button>
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
          <taskoo-loader-circle></taskoo-loader-circle>
        </div>

        <div class="entries taskoo-scrollbar-y">
          <div class="entry" v-if="!loading" v-for="user in users">
            <div class="id">
              {{ user.id }}
            </div>

            <div class="name">
              <taskoo-avatar :user="user"></taskoo-avatar>
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
              <q-tooltip class="warning-tooltip" self="center middle" anchor="top middle">
                <div v-if="user.warnings.password">{{ $t('administration.users.list.warnings.password') }}</div>
                <div v-if="user.warnings.teams">{{ $t('administration.users.list.warnings.teams') }}</div>
              </q-tooltip>
              <q-icon name="warning"></q-icon>
            </div>

            <div class="actions">
              <router-link :to="{ name: 'AdminUserEdit', params: { id: user.id }}">
                <taskoo-icon-button>
                  <q-icon name="edit"></q-icon>
                </taskoo-icon-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

