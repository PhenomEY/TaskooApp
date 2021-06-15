<template>
  <div class="teams-wrapper">

    <div class="create-team">
      <taskoo-input :label="$t('administration.teams.create')" placeholder="Name..." :model="createName" @modelChanged="createdNameChanged"></taskoo-input>

      <taskoo-icon-button class="create-button" @click="createTeam">
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

      </div>

      <div class="entry loading" v-if="!teams">
        <taskoo-loader-circle></taskoo-loader-circle>
      </div>

      <div v-else class="entries">
        <div class="entry"  v-for="(team, key) in teams">

          <div class="id">
           {{ team.id }}
          </div>

          <div class="name">
            <inputfield-editable :value="team.name" @saveInput="changedName(key, ...arguments)"></inputfield-editable>
          </div>

          <div class="color">
            <taskoo-color-select :colors="availableColors" :model="team.color" @selectedColor="changedColor(key, ...arguments)"></taskoo-color-select>
          </div>

          <div class="infos">
            <span class="projects">{{ $t('administration.teams.list.projects') }}: {{ team.projectCount }}</span>
            <span class="members">{{ $t('administration.teams.list.users') }}: {{ team.userCount }} </span>
          </div>

          <div class="actions">
            <taskoo-icon-button :disabled="!team['saveAble'] || isUpdating" @click="updateTeam(team, key)">
              <q-icon name="done"></q-icon>
            </taskoo-icon-button>

            <taskoo-icon-button @click="toggleDeleteDialog(team)">
              <q-icon name="delete"></q-icon>
            </taskoo-icon-button>
          </div>
        </div>
      </div>
    </div>

    <!--    delete team dialog-->
    <taskoo-dialog class="taskoo-dialog"
                   :active="showDeleteDialog"
                   :title="$t('prompts.delete.team.title', {name: deleteData.name, id: deleteData.id})"
                   :content="$t('prompts.delete.team.description')"
                   :confirm-text="$t('prompts.delete.team.confirm')"
                   :cancel-text="$t('prompts.delete.team.cancel')"
                   @close="toggleDeleteDialog(false)"
                   @confirm="deleteTeam"
    >
    </taskoo-dialog>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

