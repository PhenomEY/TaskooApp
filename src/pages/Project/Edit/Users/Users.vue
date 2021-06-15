<template>
  <div class="edit-project-users">
    <div class="project-users" v-if="projectData.isClosed">
      <div class="add-user">
        <taskoo-user-select v-if="availableUsers" :multi="false" :options="availableUsers" @addedUser="userSelected"></taskoo-user-select>

        <taskoo-icon-button :disabled="!selectedUser || addingUser" @click="addUser">
          <q-icon name="add"></q-icon>
        </taskoo-icon-button>
      </div>


      <div class="taskoo-list box-shadow">
        <div class="entry title">
          <div class="name">
            {{ $t('project.edit.users.name') }}
          </div>
        </div>

        <div class="entry"  v-for="(user, key) in projectData.users">
          <div class="avatar">
            <taskoo-avatar :user="user">
            </taskoo-avatar>
          </div>
          <div class="name">
            {{ user.firstname }} {{ user.lastname }}

            <span class="main" v-if="projectData.mainUser && (projectData.mainUser.id === user.id)">
              <q-icon name="star_rate"></q-icon>
            </span>
          </div>

          <div class="actions">
            <taskoo-icon-button :disabled="removingUser" @click="removeUser(user.id, key)">
              <q-icon name="remove_circle_outline"></q-icon>
            </taskoo-icon-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

