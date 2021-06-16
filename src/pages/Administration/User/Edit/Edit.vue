<template>
    <router-view v-if="$route.name === 'AdminUserEditPermissions'"></router-view>

    <div class="edit-user" v-else>
      <div class="create-header">
        <h1 class="title"> {{ $t('administration.users.editUser') }}</h1>

        <div class="back">
          <taskoo-icon-button @click="returnTo">
            <q-icon name="arrow_back"></q-icon>
          </taskoo-icon-button>
        </div>
      </div>

      <div class="error" v-if="formError">
        {{ $t('administration.users.create.formError') }}
      </div>

      <div class="loader" v-if="loading">
        <div class="taskoo-input">
          <PuSkeleton class="taskoo-skeleton" />
        </div>
        <div class="taskoo-input">
          <PuSkeleton class="taskoo-skeleton" />
        </div>
        <div class="taskoo-input">
          <PuSkeleton class="taskoo-skeleton" />
        </div>
        <div class="taskoo-input">
          <PuSkeleton class="taskoo-skeleton" />
        </div>
        <div class="taskoo-input">
          <PuSkeleton class="taskoo-skeleton" />
        </div>

        <div class="taskoo-input">
          <PuSkeleton class="taskoo-skeleton" />
        </div>

        <div class="skeleton-bottom">
          <PuSkeleton class="taskoo-skeleton" />
        </div>
      </div>

      <form novalidate class="form" @submit.prevent="updateUser" v-else>
        <taskoo-avatar :user="user"></taskoo-avatar>

        <taskoo-input :error="userForm.firstname.error" type="text" :model="userForm.firstname.value" placeholder="Jan" :label="$t('user.firstname')" @modelChanged="setUserFormValue('firstname', ...arguments)"></taskoo-input>

        <taskoo-input :error="userForm.lastname.error" type="text" :model="userForm.lastname.value" placeholder="Dommasch" :label="$t('user.lastname')" @modelChanged="setUserFormValue('lastname', ...arguments)"></taskoo-input>

        <taskoo-input :error="userForm.email.error" type="email" :model="userForm.email.value" placeholder="user@taskoo.de" label="E-Mail" @modelChanged="setUserFormValue('email', ...arguments)"></taskoo-input>

        <taskoo-input :info-text="$t('settings.account_settings.new_password_info')" :error="userForm.password.error" type="password" :model="userForm.password.value" :placeholder="$t('login.labels.password')" :label="$t('login.labels.password')" @modelChanged="setUserFormValue('password', ...arguments)"></taskoo-input>

        <taskoo-input :error="password_ver.error" type="password" :model="password_ver.value" :placeholder="$t('login.labels.password_verification')" :label="$t('login.labels.password_verification')" @modelChanged="setVerifiedPassword(...arguments)"></taskoo-input>

        <div class="role-label">Teamrolle</div>
        <multiselect v-if="availableRoles && availableRoles.length > 1" class="taskoo-select role-select"
                     v-model="userRole"
                     :options="availableRoles"
                     selectLabel=""
                     deselectLabel=""
                     selectedLabel=""
                     :searchable="false"
                     :allowEmpty="false"
        >
          <template slot="singleLabel" slot-scope="props">
        <span>
          {{props.option.name}}
        </span>
          </template>

          <template slot="option" slot-scope="props">
            <span class="organisation-entry" v-bind:style= "[props.option.color ? {color: props.option.color.hexCode} : {}]">{{ props.option.name }}</span>
          </template>
        </multiselect>

        <span class="label">{{ $t('administration.users.edit.organisations') }}</span>
        <multiselect v-if="teams" class="taskoo-select team-select"
                     v-model="assignedTeams"
                     :options="teams"
                     :multiple="true"
                     track-by="id"
                     label="name"
                     @select="setTeam"
                     @remove="removeTeam"
        >

          <template slot="tag" slot-scope="props">
                    <span class="multiselect__tag user-tag">
                    <span>{{props.option.name}}</span>
                    <i aria-hidden="true" tabindex="1" @mousedown.prevent="props.remove(props.option)" class="multiselect__tag-icon"></i>
                  </span>
          </template>

          <template slot="option" slot-scope="props">
            <span>{{ props.option.name }}</span>
          </template>
        </multiselect>

        <div v-else class="loader">
          <div class="taskoo-input">
            <PuSkeleton class="taskoo-skeleton" />
          </div>
        </div>

        <div>
          <taskoo-switch v-model="userForm.active.value" :label="$t('administration.users.edit.active')"></taskoo-switch>
        </div>

        <div class="edit-user-rights">
        <span class="label">
        {{ $t('administration.users.edit.permissions.title') }}
        </span>

        <div class="entry">
          <taskoo-switch v-model="permissions.administration" :label="$t('administration.users.edit.permissions.administration')"></taskoo-switch>
        </div>

        <div class="entry">
          <taskoo-switch v-model="permissions.project_create" :disabled="permissions.administration" :label="$t('administration.users.edit.permissions.project_create')"></taskoo-switch>
        </div>

        <div class="entry">
          <taskoo-switch v-model="permissions.project_edit" :disabled="permissions.administration" :label="$t('administration.users.edit.permissions.project_edit')"></taskoo-switch>
        </div>
      </div>

        <button type="submit" class="taskoo-button" :disabled="updatingUser" @click="updateUser">{{ $t('administration.users.edit.save') }}</button>
      </form>


      <button class="taskoo-button delete" @click="toggleDeleteDialog">
        {{ $t('administration.users.edit.delete') }}
      </button>

      <!--    delete project dialog-->
      <taskoo-dialog class="taskoo-dialog"
                     :active="showDeleteDialog"
                     :title="$t('prompts.delete.user.title', {firstname: user.firstname, lastname: user.lastname})"
                     :content="$t('prompts.delete.user.description')"
                     :confirm-text="$t('prompts.delete.user.confirm')"
                     :cancel-text="$t('prompts.delete.user.cancel')"
                     @close="toggleDeleteDialog"
                     @confirm="deleteUser"
      >
      </taskoo-dialog>
    </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

