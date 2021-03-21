<template>
  <div class="edit-project-users">
    <div class="project-users" v-if="projectData.isClosed">
      <div class="add-user">
        <taskoo-user-select v-if="availableUsers" :multi="false" :options="availableUsers" @addedUser="userSelected"></taskoo-user-select>
        <md-button :disabled="!selectedUser || addingUser" class="md-icon-button md-list-action" @click="addUser">
          <md-icon>add</md-icon>
        </md-button>
      </div>


      <div class="taskoo-list box-shadow">
        <div class="entry title">
          <div class="name">
            {{ $t('project.edit.users.name') }}
          </div>
        </div>

        <div class="entry"  v-for="(user, key) in projectData.users">
          <div class="avatar">
            <md-button class="md-icon-button task-user">
              <md-avatar class="md-avatar-icon">{{ user.firstname.charAt(0) }}
                <md-tooltip md-direction="bottom">{{ user.firstname }} {{ user.lastname }}</md-tooltip>
              </md-avatar>
            </md-button>
          </div>
          <div class="name">
            {{ user.firstname }} {{ user.lastname }}

            <span class="main" v-if="projectData.mainUser && (projectData.mainUser.id === user.id)">
              STAR
            </span>
          </div>

          <div class="actions">
            <md-button class="md-icon-button md-list-action" :disabled="removingUser" @click="removeUser(user.id, key)">
              <md-icon>remove_circle_outline</md-icon>
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

