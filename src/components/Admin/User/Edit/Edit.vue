<template>
  <div class="edit-user">

    <div class="error" v-if="formError">
      {{ $t('settings.users.create.formError') }}
    </div>

    <form novalidate class="form" @submit.prevent="updateUser">
      <taskoo-input :error="userForm.firstname.error" type="text" :model="userForm.firstname.value" placeholder="Jan" :label="$t('user.firstname')" @modelChanged="setUserFormValue('firstname', ...arguments)"></taskoo-input>

      <taskoo-input :error="userForm.lastname.error" type="text" :model="userForm.lastname.value" placeholder="Dommasch" :label="$t('user.lastname')" @modelChanged="setUserFormValue('lastname', ...arguments)"></taskoo-input>

      <taskoo-input :error="userForm.email.error" type="email" :model="userForm.email.value" placeholder="user@taskoo.de" label="E-Mail" @modelChanged="setUserFormValue('email', ...arguments)"></taskoo-input>

      <taskoo-input :error="userForm.password.error" type="password" :model="userForm.password.value" :placeholder="$t('login.labels.password')" :label="$t('login.labels.password')" @modelChanged="setUserFormValue('password', ...arguments)"></taskoo-input>

      <taskoo-input :error="password_ver.error" type="password" :model="password_ver.value" :placeholder="$t('login.labels.password_verification')" :label="$t('login.labels.password_verification')" @modelChanged="setVerifiedPassword(...arguments)"></taskoo-input>

      <button type="submit" class="taskoo-button" :disabled="updatingUser" @click="updateUser">{{ $t('settings.users.create.createUser') }}</button>
    </form>
  </div>
</template>


<script src="./index.js"></script>

<style src="./style.scss" lang="scss">
</style>

