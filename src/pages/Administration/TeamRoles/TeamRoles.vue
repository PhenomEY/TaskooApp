<template>
  <div class="teamroles-wrapper">

    <div class="create-teamrole">
      <taskoo-input class="name" :label="$t('administration.teamroles.create')" placeholder="Name..." :model="createName" @modelChanged="createdNameChanged"></taskoo-input>
      <taskoo-input class="priority" :placeholder="$t('administration.teamroles.priority_placeholder')" :model="createPriority" @modelChanged="createdPriorityChanged"></taskoo-input>

      <taskoo-icon-button class="create-button" @click="createRole">
        <q-icon name="add"></q-icon>
      </taskoo-icon-button>
    </div>

    <div class="taskoo-list box-shadow">
      <div class="entry title">
        <div class="id">
          {{ $t('administration.users.list.id') }}
        </div>

        <div class="name">
          {{ $t('administration.users.list.name') }}
        </div>

        <div class="priority">
          {{ $t('administration.teamroles.list.priority') }}
        </div>
      </div>

      <div class="entry loading" v-if="loading">
        <taskoo-loader-circle></taskoo-loader-circle>
      </div>

      <div v-else class="entries">
        <div class="entry"  v-for="(role, key) in teamroles">

          <div class="id">
            {{ role.id }}
          </div>

          <div class="name">
            <inputfield-editable :value="role.name" @saveInput="changedName(key, ...arguments)"></inputfield-editable>
          </div>

          <div class="priority">
            <inputfield-editable :value="role.priority" @saveInput="changedPriority(key, ...arguments)"></inputfield-editable>
          </div>

          <div class="actions">
            <taskoo-icon-button :disabled="!role.saveAble || isUpdating" @click="updateRole(role, key)">
              <q-icon name="done"></q-icon>
            </taskoo-icon-button>

            <taskoo-icon-button @click="toggleDeleteDialog(role)">
              <q-icon name="delete"></q-icon>
            </taskoo-icon-button>
          </div>
        </div>
      </div>
    </div>

    <!--    delete team dialog-->
    <taskoo-dialog class="taskoo-dialog"
                   :active="showDeleteDialog"
                   :title="$t('prompts.delete.teamrole.title', {name: deleteData.name, id: deleteData.id})"
                   :content="$t('prompts.delete.teamrole.description')"
                   :confirm-text="$t('prompts.delete.teamrole.confirm')"
                   :cancel-text="$t('prompts.delete.teamrole.cancel')"
                   @close="toggleDeleteDialog(false)"
                   @confirm="deleteRole"
    >
    </taskoo-dialog>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

