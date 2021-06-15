<template>
  <div class="create-user width-fix">
    <div class="create-header">
        <h1 class="title"> {{ $t('administration.users.createUser') }}</h1>

      <div class="back">
        <taskoo-icon-button @click="returnTo">
          <q-icon name="arrow_back"></q-icon>
        </taskoo-icon-button>
      </div>
    </div>

    <div class="create-switch">
      <div class="entry invite" v-bind:class="{'active': (invite === true)}" @click="toggleInvite(true)">
       <q-icon name="o_mail"></q-icon>
        {{ $t('administration.users.create.invite') }}
      </div>

      <div class="entry manually" v-bind:class="{'active': (invite === false)}" @click="toggleInvite(false)">
        <q-icon name="add"></q-icon>
        {{ $t('administration.users.create.manually') }}
      </div>
    </div>

    <div class="invite-form" v-show="invite">
      <div class="error" v-if="inviteError">
        {{ $t('administration.users.create.formError') }}
      </div>

      <form novalidate class="form" @submit.prevent="sendInvite">
        <taskoo-input :error="inviteForm.firstname.error" type="text" :model="inviteForm.firstname.value" placeholder="Jan" :label="$t('user.firstname')" @modelChanged="setInviteFormValue('firstname', ...arguments)"></taskoo-input>

        <taskoo-input :error="inviteForm.lastname.error" type="text" :model="inviteForm.lastname.value" placeholder="Dommasch" :label="$t('user.lastname')" @modelChanged="setInviteFormValue('lastname', ...arguments)"></taskoo-input>

        <taskoo-input :error="inviteForm.email.error" type="email" :model="inviteForm.email.value" placeholder="user@taskoo.de" label="E-Mail" @modelChanged="setInviteFormValue('email', ...arguments)"></taskoo-input>

        <button type="submit" class="taskoo-button" :disabled="sendingInvite">{{ $t('administration.users.create.submitInvite') }}</button>
      </form>
    </div>


    <div class="manual-form" v-show="!invite">
      <div class="error" v-if="createError">
        {{ $t('administration.users.create.formError') }}
      </div>

      <form novalidate class="form" @submit.prevent="createUser">
        <taskoo-input :error="manualForm.firstname.error" type="text" :model="manualForm.firstname.value" placeholder="Jan" label="Vorname" @modelChanged="setManualFormValue('firstname', ...arguments)"></taskoo-input>

        <taskoo-input :error="manualForm.lastname.error" type="text" :model="manualForm.lastname.value" placeholder="Dommasch" label="Nachname" @modelChanged="setManualFormValue('lastname', ...arguments)"></taskoo-input>

        <taskoo-input :error="manualForm.email.error" type="email" :model="manualForm.email.value" placeholder="user@taskoo.de" label="E-Mail" @modelChanged="setManualFormValue('email', ...arguments)"></taskoo-input>

        <taskoo-input :error="manualForm.password.error" type="password" :model="manualForm.password.value" :placeholder="$t('login.labels.password')" :label="$t('login.labels.password')" @modelChanged="setManualFormValue('password', ...arguments)"></taskoo-input>

        <taskoo-input :error="password_ver.error" type="password" :model="password_ver.value" :placeholder="$t('login.labels.password_verification')" :label="$t('login.labels.password_verification')" @modelChanged="setVerifiedPassword(...arguments)"></taskoo-input>

        <button type="submit" class="taskoo-button" :disabled="creatingUser">{{ $t('administration.users.create.createUser') }}</button>
      </form>
    </div>

  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

