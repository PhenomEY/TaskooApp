<template>
  <div class="edit-user">

    <div class="create-header">
      <h1 class="title"> {{ $t('settings.users.editUser') }}</h1>

      <div class="back">
        <md-button class="md-icon-button md-list-action" @click="returnTo">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </div>
    </div>

    <div class="error" v-if="formError">
      {{ $t('settings.users.create.formError') }}
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
    </div>
    <form novalidate class="form" @submit.prevent="updateUser" v-else>
      <taskoo-input :error="userForm.firstname.error" type="text" :model="userForm.firstname.value" placeholder="Jan" :label="$t('user.firstname')" @modelChanged="setUserFormValue('firstname', ...arguments)"></taskoo-input>

      <taskoo-input :error="userForm.lastname.error" type="text" :model="userForm.lastname.value" placeholder="Dommasch" :label="$t('user.lastname')" @modelChanged="setUserFormValue('lastname', ...arguments)"></taskoo-input>

      <taskoo-input :error="userForm.email.error" type="email" :model="userForm.email.value" placeholder="user@taskoo.de" label="E-Mail" @modelChanged="setUserFormValue('email', ...arguments)"></taskoo-input>

      <taskoo-input :error="userForm.password.error" type="password" :model="userForm.password.value" :placeholder="$t('login.labels.password')" :label="$t('login.labels.password')" @modelChanged="setUserFormValue('password', ...arguments)"></taskoo-input>

      <taskoo-input :error="password_ver.error" type="password" :model="password_ver.value" :placeholder="$t('login.labels.password_verification')" :label="$t('login.labels.password_verification')" @modelChanged="setVerifiedPassword(...arguments)"></taskoo-input>

      <div>
        <md-switch v-model="userForm.active.value" class="md-primary">Active</md-switch>
      </div>

      <div class="user-role">
        <span class="label">{{ $t('settings.users.edit.role') }}</span>
        <multiselect class="taskoo-select"
                     v-model="userRole"
                     :options="userRoles"
                     :searchable="false"
                     selectLabel=""
                     deselectLabel=""
                     selectedLabel=""
                     :allowEmpty="false"
                     @select="updatePriority"
        >
          <template slot="singleLabel" slot-scope="props"> <span>{{props.option}}</span></template>

          <template slot="option" slot-scope="props">
            <span>{{ props.option }}</span>
          </template>
        </multiselect>
      </div>


      <button type="submit" class="taskoo-button" :disabled="updatingUser" @click="updateUser">{{ $t('settings.users.edit.save') }}</button>
    </form>

    <span class="label">Zugewiesene Abteilungen</span>
    <multiselect v-if="organisations" class="taskoo-select"
                 v-model="assignedOrganisations"
                 :options="organisations"
                 :multiple="true"
                 track-by="id"
                 label="name"
                 @select="setOrganisation"
                 @remove="removeOrganisation"
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
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

