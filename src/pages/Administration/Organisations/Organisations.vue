<template>
  <div class="organisations-wrapper">

    <div class="create-organisation">
      <taskoo-input :label="$t('administration.organisations.create')" placeholder="Name..." :model="createName" @modelChanged="createdNameChanged"></taskoo-input>

      <taskoo-icon-button class="create-button" @click="createOrganisation">
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

      <div class="entry loading" v-if="!organisations">
        <taskoo-loader-circle></taskoo-loader-circle>
      </div>

      <div v-else class="entries">
        <div class="entry"  v-for="(organisation, key) in organisations">

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
            <taskoo-icon-button :disabled="!organisation['saveAble'] || isUpdating" @click="updateOrganisation(organisation, key)">
              <q-icon name="done"></q-icon>
            </taskoo-icon-button>

            <taskoo-icon-button @click="toggleDeleteDialog(organisation)">
              <q-icon name="delete"></q-icon>
            </taskoo-icon-button>
          </div>
        </div>
      </div>
    </div>

    <!--    delete organisation dialog-->
    <taskoo-dialog class="taskoo-dialog"
                   :active="showDeleteDialog"
                   :title="$t('prompts.delete.organisation.title', {name: deleteData.name, id: deleteData.id})"
                   :content="$t('prompts.delete.organisation.description')"
                   :confirm-text="$t('prompts.delete.organisation.confirm')"
                   :cancel-text="$t('prompts.delete.organisation.cancel')"
                   @close="toggleDeleteDialog(false)"
                   @confirm="deleteOrganisation"
    >
    </taskoo-dialog>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

