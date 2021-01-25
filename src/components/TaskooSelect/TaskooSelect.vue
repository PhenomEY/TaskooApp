<template>
  <div class="taskoo-select" v-bind:class="{'user-select': (type === 'users')}">
      <v-popover offset="5" placement="right" popoverBaseClass="taskoo-select-menu">
        <button class="opener tooltip-target">
          <span v-if="type === 'users'"><md-icon>add</md-icon></span>
          <span>{{ placeholder }}</span>
        </button>

        <template slot="popover">
          <div class="taskoo-select-options">
            <slot>
            </slot>
          </div>
        </template>
      </v-popover>

    <div class="users" v-if="type === 'users'">
      <div class="user-chip" v-for="user in data">
        <span class="name">
          <span v-if="user.firstname">{{ user.firstname }}</span>
           <span v-if="user.lastname">{{ user.lastname }}</span>
        </span>
        <md-button class="md-icon-button" @click="removeUser(user.id)">
          <md-icon>close</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

