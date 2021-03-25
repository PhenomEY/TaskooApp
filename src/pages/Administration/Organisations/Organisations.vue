<template>
  <div class="organisations-wrapper">

    <div class="create-organisation">
      <taskoo-input :label="$t('administration.organisations.create')" placeholder="Name..." :model="createName" @modelChanged="createdNameChanged"></taskoo-input>

      <md-button class="md-icon-button md-list-action create-button" @click="createOrganisation">
        <md-icon>add</md-icon>
      </md-button>
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

      <div class="entry loading" v-if="!organisations">
        <md-progress-spinner :md-diameter="30" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      </div>

      <div class="entry" v-else v-for="(organisation, key) in organisations">

        <div class="id">
         {{ organisation.id }}
        </div>

        <div class="name">
          <inputfield-editable :value="organisation.name" @saveInput="changedName(key, ...arguments)"></inputfield-editable>
        </div>

        <div class="color">
          <taskoo-color-select :colors="availableColors" :model="organisation.color" @selectedColor="changedColor(key, ...arguments)"></taskoo-color-select>
        </div>

        <div class="infos">
          <span class="projects">{{ $t('administration.organisations.list.projects') }}: {{ organisation.projectCount }}</span>
          <span class="members">{{ $t('administration.organisations.list.users') }}: {{ organisation.userCount }} </span>
        </div>

        <div class="actions">
          <md-button class="md-icon-button md-list-action" :disabled="!organisation['saveAble'] || isUpdating" @click="updateOrganisation(organisation, key)">
            <md-icon>done</md-icon>
          </md-button>

          <md-button class="md-icon-button md-list-action" @click="toggleDeleteDialog(organisation)">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </div>
    </div>

    <!--    delete organisation dialog-->
    <md-dialog-confirm
      :md-active.sync="showDeleteDialog"
      :md-title="$t('prompts.delete.organisation.title', {name: deleteData.name, id: deleteData.id})"
      :md-content="$t('prompts.delete.organisation.description')"
      :md-confirm-text="$t('prompts.delete.organisation.confirm')"
      :md-cancel-text="$t('prompts.delete.organisation.cancel')"
      @md-cancel="toggleDeleteDialog(false)"
      @md-confirm="deleteOrganisation"
      class="taskoo-dialog"
    />

  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

