<template>
  <div class="create-user">
    <div class="create-header">
        <h1 class="title"> {{ $t('settings.users.createUser') }}</h1>

      <div class="back">
        <md-button class="md-icon-button md-list-action" @click="returnTo">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </div>
    </div>

    <div class="create-switch">
      <div class="invite" v-bind:class="{'active': (invite === true)}" @click="toggleInvite(true)">
       <md-icon>mail</md-icon>
        {{ $t('settings.users.create.invite') }}
      </div>

      <div class="manually" v-bind:class="{'active': (invite === false)}" @click="toggleInvite(false)">
        <md-icon>add</md-icon>
        {{ $t('settings.users.create.manually') }}
      </div>
    </div>

    <div class="invite-form" v-show="invite">
      <div class="error" v-if="formError">
        Bitte fülle die markierten Felder aus
      </div>

      <form novalidate class="form" @submit.prevent="sendInvite">
        <taskoo-input :error="inviteForm.firstname.error" type="text" :model="inviteForm.firstname.value" placeholder="Jan" label="Vorname" @modelChanged="setInviteFormValue('firstname', ...arguments)"></taskoo-input>

        <taskoo-input :error="inviteForm.lastname.error" type="text" :model="inviteForm.lastname.value" placeholder="Dommasch" label="Nachname" @modelChanged="setInviteFormValue('lastname', ...arguments)"></taskoo-input>

        <taskoo-input :error="inviteForm.email.error" type="email" :model="inviteForm.email.value" placeholder="user@taskoo.de" label="E-Mail" @modelChanged="setInviteFormValue('email', ...arguments)"></taskoo-input>

        <button type="submit" class="taskoo-button" :disabled="sendingInvite">Einladung senden</button>
      </form>
    </div>

  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

